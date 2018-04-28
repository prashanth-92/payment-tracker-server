const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');
const router = express.Router(); 
const Student = require('./Student');
const Payment = require('./Payment');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use('/api', router)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

mongoose.connect(process.env.DBURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});
router.get('/student/:classId',function(req, res){
  Student.find({academicYear: '18-19', class: req.params.classId}).exec( (err, data) =>{
    res.send(data);
  })
});
router.get('/payment/:studentId', function(req, res){
  Payment.find({studentId: req.params.studentId}).exec( (err, data) =>{
    res.send(data);
  })
})
router.post('/payment', function(req, res){
  let data = req.body;
  let payment = new Payment({
    amount: data.installment,
    isCheque: data.isCheque,
    dateModified: new Date(),
    studentId: data._id
  });
  payment.save((err, resp) =>{
    if(err) throw err;
    Student.findOneAndUpdate({_id: resp.studentId}, { $inc: { "amount" : resp.amount }}).exec( (err, data) => {
      res.send(resp);
    })
    
  })
});
router.post('/student', function(req, res) {
  let data = req.body;
  let student = new Student({
    name : data.name,
    class : data.class,
    school : data.school,
    subjects : data.subjects,
    contactNumber : data.tel,
    academicYear: '18-19',
    amount: 0
  });
  student.save((err, data) => {
    if(err) throw err;
    res.send({"message": data});
  })
});

