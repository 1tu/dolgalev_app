<doctors-item>
  <p>{ data.last_name }</p>
  <p>{ data.first_name }</p>
  <p>{ data.second_name }</p>
  <h2>График работы</h2>

  <table if={ data.schedule }>
    <tr each={ day, i in data.schedule } >
      <td>{ fn.data.rusDays[i] }</td>
      <td>{ day.begin }</td>
      <td>{ day.end }</td>
    </tr>
  </table>

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    rc.trigger('set_title', 'Врач')
    t.update({data: s.doctors.getCurrent()})
  });
  
</doctors-item>