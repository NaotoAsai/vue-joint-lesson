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
    tasks: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0,  label: '作業中' },
      { value: 1,  label: '完了' }
    ],
    // 選択している options の value を記憶するためのデータ
    // 初期値を「-1」つまり「すべて」にする
    current: -1
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
    },
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1
    },
    doRemove: function(item) {
      if (confirm(`ID:${item.id}のタスクを本当に削除しますか？`)) {
        var index = this.tasks.indexOf(item)
        this.tasks.splice(index,1)
      }
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
  },
  created() {
    this.tasks = taskStorage.fetch()
  },
  computed: {
    computedTasks: function() {
      //データcurrentが-1ならすべて、それ以外ならcurrentとstateが一致するものだけに絞り込む
      return this.tasks.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      },this)
    },
    labels: function() {
      return this.options.reduce(function(a,b) {
        return Object.assign(a,{[b.value]: b.label})
      },{})
      //キーから見つけやすいようにデータを加工する
      //{0: '作業中', 1: '完了', -1: 'すべて'}
    }
  }
})
