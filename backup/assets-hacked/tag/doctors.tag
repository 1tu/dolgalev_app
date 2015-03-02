<doctors>
  <a href={ '#/doctors/'+id } class={ 'isle' } each={ data }>
    <p>{ last_name }</p>
    <p>{ first_name }</p>
    <p>{ second_name }</p>
  </a>


  var t = this
    , s = stores

  t.data = s.doctors.data || []

  t.on('doctors_update', function(data) {
    t.update({data: data})
  });
  
  t.on('mount', function() {
    tags.add(t)
  });

</doctors>