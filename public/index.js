
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

        axios({
          url: '/invoice',
          method: 'POST',
          responseType: 'blob', // important,
          data : {
              name:this.name,
              suppliedBy:this.suppliedBy,
              date:this.date,
              suppliedTo : this.suppliedTo,
              total: 'R '+this.total
            }
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf');
          document.body.appendChild(link);
          link.click();
        })
        .then((response) => {
          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf'); //or any other extension
          document.body.appendChild(link);
          link.click();
      }).catch(function (error) {
          console.log(error);
        })}
    }
    
  })