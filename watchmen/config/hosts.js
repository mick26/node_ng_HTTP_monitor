var one_tick = 20; //seconds



//service name must be unique for a certain host.
//host name must be unique
module.exports =
  [
    {
      name: 'Eircom Net',
      host: 'www.eircom.net',
      port: 80,
      ping_service_name: 'http',
      timeout:10000,
      ping_interval: one_tick, //seconds
      failed_ping_interval: one_tick / 3, //seconds
      enabled: true,
      alert_to: ['mcullen26@gmail.com'],
      warning_if_takes_more_than: 1500, //miliseconds
      remove_events_older_than_seconds : 60 * 60 * 24 * 10, // purgue events older than (seconds)
      services : [
        {
          name: 'Eircom Server',
          method: 'get',
          url : '/',
          expected: {statuscode: 200}
        }
      ]
    },

    {
      name:'Irish Stock Exchange',
      host: 'www.ise.ie',
      port:80,
      protocol: 'http',
      ping_service_name: 'http',
      timeout:10000,
      ping_interval: one_tick, //seconds
      failed_ping_interval: one_tick / 3, //seconds
      enabled: true,
      alert_to: ['mcullen26@gmail.com'],
      warning_if_takes_more_than: 1500, //miliseconds
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: {statuscode: 200, contains: 'Market-Data-Announcements'}
        }
      ]
    },

    {
      name:'European Telecoms Standards',
      host: 'www.etsi.org',
      port:80,
      ping_service_name: 'http',
      timeout:10000,
      ping_interval: one_tick, //seconds
      failed_ping_interval: one_tick / 3, //seconds
      enabled: true,
      alert_to: ['your-email@domain.com'],
      warning_if_takes_more_than: 1500, //miliseconds
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: {statuscode: 200}
        },
      ]
    },

    {
      name:'GitHub',
      host: 'github.com',
      protocol:'https',
      port:443,
      ping_service_name:'http',
      timeout:5000,
      ping_interval: one_tick,
      failed_ping_interval: one_tick / 3,
      warning_if_takes_more_than: 1300, //miliseconds
      enabled: true,
      alert_to: ['whoever@mmm.net'], //you can include a different email recipient per host
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: { statuscode: 200}
        }
      ]
    },


    {
      name:'Stackoverflow',
      host: 'stackoverflow.com',
      protocol: 'https',
      port:443,
      ping_service_name: 'http',
      timeout:10000,
      ping_interval: one_tick,
      failed_ping_interval: one_tick / 3,
      warning_if_takes_more_than: 3000, //miliseconds
      enabled: true,
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: {statuscode: 200, contains: ''}
        }
      ]
    },

    {
      name:'letsnode.com',
      host: 'letsnode.com',
      port:80,
      ping_service_name: 'http',
      timeout:10000,
      ping_interval: one_tick,
      failed_ping_interval: one_tick / 3,
      enabled: true,
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: {statuscode: 200, contains: 'A blog about node.js and express.js'}
        }
      ]
    },

    {
      name:'Amazon',
      host: 'www.amazon.com',
      port:80,
      ping_service_name: 'http',
      timeout: 10000,
      ping_interval: one_tick,
      failed_ping_interval: one_tick / 3,
      warning_if_takes_more_than: 2000, //miliseconds
      enabled: true,
      alert_to:['your-email@domain.com'],
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: {statuscode: 200, contains: 'Amazon'}
        }
      ]
    },

    {
      name:'hacker news',
      host: 'news.ycombinator.com',
      port:80,
      ping_service_name: 'http',
      timeout:10000,
      ping_interval: one_tick,
      failed_ping_interval: one_tick / 3,
      warning_if_takes_more_than: 4000, //miliseconds
      enabled: true,
      alert_to:['your-email@domain.com'],
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: { statuscode: 301 }
        }
      ]
    },

    {
      name:'node js',
      host: 'nodejs.org',
      port:80,
      ping_service_name: 'http',
      timeout:10000,
      ping_interval: one_tick,
      failed_ping_interval: one_tick / 3,
      warning_if_takes_more_than: 1500,
      enabled: true,
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: {statuscode: 200, contains: 'Node'}
        }
      ]
    },

    {
      name:'redis',
      host: 'redis.io',
      port:80,
      ping_service_name: 'http',
      timeout:10000,
      ping_interval: one_tick,
      failed_ping_interval: one_tick / 3,
      warning_if_takes_more_than: 1500,
      enabled: true,
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: {statuscode: 200, contains: 'Redis'}
        }
      ]
    },

    {
      name:'express',
      host: 'expressjs.com',
      port:80,
      ping_service_name: 'http',
      timeout:10000,
      ping_interval: one_tick,
      failed_ping_interval: one_tick / 3,
      enabled: true,
      services : [
        {
          name: 'home',
          method: 'get',
          url : '/',
          expected: {statuscode: 200, contains: 'web application framework'}
        }
      ]
    }
  ];