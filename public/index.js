
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, { 
    });
});


var app = new Vue({
    el: '#app',
    data : {
      date : '',
      name:'',
      suppliedBy:'',
      suppliedTo:'',
      total:0
    },
    methods : {
      sendInvoice : function(){
        axios.post('/invoice',{
          name:this.name,
          suppliedBy:this.suppliedBy,
          date:this.date,
          suppliedTo : this.suppliedTo,
          total: 'R '+this.total
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })}
    }
    
  })