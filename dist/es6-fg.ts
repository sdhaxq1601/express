if (typeof Vue === 'undefined') {
  var Vue
}
if (typeof axios === 'undefined') {
  var axios
}
var tab = {
  props: ['who'],
  methods: {
    click: function(e) {
      this.$emit('changewho', e.target.id)
    }
  },
  template: '#tab-template'
}
var sendURL = {
  //接收url**************************************************
  props: ['show', 'history'],
  data: function() {
    return {
      url: ''
    }
  },
  template: '#sendURL-template',
  methods: {
    fixUrl() {
      if (!/^http[s]{0,1}:\/\//.test(this.url)) {
        this.url = 'http://' + this.url.replace(/^.{0,5}:\/\//g, '')
      }
    },
    enterSubmit(e) {
      console.log(e.target.parentElement)
      e.target.parentElement.submit()
      this.url = ''
    },
    log() {
      console.log(this.$data)
    }
  }
}
var sendFile = {
  //发送文件**************************************************
  props: ['show'],
  data() {
    return {}
  },
  template: '#sendFile-template',
  methods: {}
}
var receiveFile = {
  //接收文件**************************************************
  props: ['show', 'files'],
  data: function() {
    return {
      path: 'static/download/'
    }
  },
  methods: {},
  computed: {},
  template: '#receiveFile-template'
}
var app = new Vue({
  el: '#app',
  data: {
    who: 1,
    files: [],
    his: []
  },
  methods: {
    handler: function(v) {
      if (v) this.who = v
      console.log('@', v)
    },
    getHistory() {
      console.log('history....')
      var vm = this
      axios
        .get('history')
        .then(function(v) {
          console.log(v.data)
          console.log(vm.files)
          vm.his = v.data
        })
        .catch(function(err) {
          //错误处理
        })
    },
    clearInput() {
      var obj = document.getElementById('sfile')
      obj.outerHTML = obj.outerHTML
    }
  },
  components: {
    tab: tab,
    'send-url': sendURL,
    'send-file': sendFile,
    'receive-file': receiveFile
  },
  mounted: function() {
    var vm = this
    axios
      .get('getfilelist')
      .then(function(v) {
        console.log(v.data)
        console.log(vm.files)
        vm.files = v.data
      })
      .catch(function(err) {
        //错误处理
      })
    this.getHistory()
  }
})
