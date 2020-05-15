// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var taskStorage = {
  fetch: function() {
    var tasks = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    tasks.forEach(function(task, index) {
      task.id = index
    })
    taskStorage.uid = tasks.length
    return tasks
  },
  save: function(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }
}


const app = new Vue({
  el: '#app',
  data: {
    tasks: []
  },
  methods: {
    // ToDo 追加の処理
    doAdd: function(event, value) {
      // ref で名前を付けておいた要素を参照
      var task = this.$refs.task
      // 入力がなければ何もしないで return
      if (!task.value.length) {
        return
      }
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.tasks.push({
        id: taskStorage.uid++,
        task: task.value,
        state: 0
      })
      // フォーム要素を空にする
      task.value = ''
    }
  },
  watch: {
    //オプションはオブジェクト形式で記述
    tasks: {
      //引数はウォッチしているプロパティの変更後の値
      handler: function(tasks) {
        taskStorage.save(tasks)
      },
      //deepオプションでネストしているデータも監視できる
      deep: true
    }
  }
})
