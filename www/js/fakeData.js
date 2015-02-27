var fake = {

  doctors: [
    {
      "id": 1,
      "last_name": "Долгалев",
      "first_name": "Александр",
      "second_name": "Александрович",
      "email": "enim.Etiam.gravida@mollis.edu",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 2,
      "last_name": "Долгалева",
      "first_name": "Людмила",
      "second_name": "Анатольевна",
      "email": "gravida@mi.ca",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 3,
      "last_name": "Соболев",
      "first_name": "Дмитрий",
      "second_name": "Александрович",
      "email": "ut@sociisnatoque.net",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 4,
      "last_name": "Корниенко",
      "first_name": "Сергей",
      "second_name": "Владимирович",
      "email": "at.sem@tinciduntvehicula.ca",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 5,
      "last_name": "Черная",
      "first_name": "Инна",
      "second_name": "Анатольевна",
      "email": "nibh.Donec.est@augueSedmolestie.org",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 6,
      "last_name": "Миленина",
      "first_name": "Алла",
      "second_name": "Адамовна",
      "email": "vel.sapien.imperdiet@at.com",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 7,
      "last_name": "Сегида",
      "first_name": "Ирина",
      "second_name": "Владимировна",
      "email": "sed@Maurisquis.edu",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 8,
      "last_name": "Шагимарданова",
      "first_name": "Анна",
      "second_name": "Владиславовна",
      "email": "quis.diam.luctus@atfringillapurus.org",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 9,
      "last_name": "Соколовская",
      "first_name": "Марина",
      "second_name": "Руслановна",
      "email": "Integer.tincidunt@primis.org",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    }
  ],

  requests: [
    {"id":1,"doctor_id":1,"date":"2015/02/14","time_begin":"11:36","time_end":"18:04"},
    {"id":2,"doctor_id":1,"date":"2015/05/05","time_begin":"9:39","time_end":"15:19"},
    {"id":3,"doctor_id":3,"date":"2015/05/16","time_begin":"10:37","time_end":"18:29"},
    {"id":4,"doctor_id":1,"date":"2015/02/25","time_begin":"9:52","time_end":"15:32"},
    {"id":5,"doctor_id":3,"date":"2015/04/03","time_begin":"10:52","time_end":"15:39"},
    {"id":6,"doctor_id":3,"date":"2015/05/17","time_begin":"11:05","time_end":"19:57"},
    {"id":7,"doctor_id":2,"date":"2015/02/21","time_begin":"9:40","time_end":"16:42"},
    {"id":8,"doctor_id":2,"date":"2015/02/17","time_begin":"10:42","time_end":"15:31"},
    {"id":9,"doctor_id":2,"date":"2015/02/24","time_begin":"11:20","time_end":"15:34"},
    {"id":10,"doctor_id":2,"date":"2015/03/26","time_begin":"11:51","time_end":"15:49"}
  ],

  receptions: [
    {"id":1,"doctor_id":3,"state":"confirmed","type":"pull_tooth","datetime":"2015-03-05T09:47:56Z"},
    {"id":2,"doctor_id":2,"state":"not_confirmed","type":"reception","datetime":"2015-03-26T10:30:43Z"},
    {"id":3,"doctor_id":1,"state":"confirmed","type":"reception","datetime":"2015-03-26T08:55:00Z"},
    {"id":4,"doctor_id":3,"state":"confirmed","type":"reception","datetime":"2015-04-22T00:47:36Z"},
    {"id":5,"doctor_id":2,"state":"confirmed","type":"pull_tooth","datetime":"2015-03-03T13:23:12Z"},
    {"id":6,"doctor_id":1,"state":"confirmed","type":"pull_tooth","datetime":"2015-03-04T00:23:28Z"},
    {"id":7,"doctor_id":3,"state":"not_confirmed","type":"reception","datetime":"2015-03-30T20:27:04Z"}
  ]

}