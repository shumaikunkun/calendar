const weeks = ['日', '月', '火', '水', '木', '金', '土']
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1

// クリックした日付
let clickdata
// イベント情報のデータ
let eventname = "入力なし"
let fortime = "入力なし"
let totime = "入力なし"
let memo = "入力なし"

const config = {
    showm: 1,//ページに表示したいカレンダーの数（月ごと）
    showe: 1//表示したいイベント数,イベントが入力されるごとに増える
}

function showCalendar(year, month) {
    for ( i = 0; i < config.showm; i++) {
        const calendarHtml = createCalendar(year, month)
        const secc = document.createElement('section')
        secc.innerHTML = calendarHtml
        document.querySelector('#calendar').appendChild(secc)

        month++
        if (month > 12) {
            year++
            month = 1
        }
    }
}

function createCalendar(year, month) {
    const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
    const endDate = new Date(year, month,  0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    const lastMonthEndDate = new Date(year, month - 2, 0) // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日
    const startDay = startDate.getDay() // 月の最初の日の曜日を取得
    let dayCount = 1 // 日にちのカウント
    let calendarHtml = '' // HTMLを組み立てる変数

    calendarHtml += '<h1>' + year  + '/' + month + '</h1>'
    calendarHtml += '<table>'

    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += '<td>' + weeks[i] + '</td>'
    }

    for (let w = 0; w < 6; w++) {
        calendarHtml += '<tr>'

        for (let d = 0; d < 7; d++) {
            if (w == 0 && d < startDay) {
                // 1行目で1日の曜日の前
                let num = lastMonthendDayCount - startDay + d + 1
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
            } else if (dayCount > endDayCount) {
                // 末尾の日数を超えた
                let num = dayCount - endDayCount
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
                dayCount++
            } else {
                calendarHtml += `<td class="calendar_td" data-date="${year}/${month}/${dayCount}" data-eventname="${eventname}" data-fortime="${fortime}" data-totime="${totime}" data-memo="${memo}"> ${dayCount}</td>`
                dayCount++
            }
        }
        calendarHtml += '</tr>'
    }
    calendarHtml += '</table>'

    return calendarHtml
}

function moveCalendar(e) {
    document.querySelector('#calendar').innerHTML = ''

    if (e.target.id === 'prev') {
        month--
        if (month < 1) {
            year--
            month = 12
        }
    }

    if (e.target.id === 'next') {
        month++
        if (month > 12) {
            year++
            month = 1
        }
    }

    showCalendar(year, month)
}

// function dataget(){//入力データの取得//eじゃダメ、日付のデータの場所？を何かに保持しておく必要がある
//   event.preventDefault();//ボタンの機能をオフ
// 	//イベント名
// 	if (form.eventname.value == ""){
// 		clickdata.target.dataset.eventname = "入力なし";
// 	} else {
//     console.log(form.eventname.value);
// 		clickdata.target.dataset.eventname = form.eventname.value;
// 	}
//
//   //時間
//   if(form.fortime.value == "" ){
//     clickdata.target.dataset.fortime = "入力なし";
//     if(form.totime.value == ""){
//       clickdata.target.dataset.totime = "入力なし";
//     }else{
//       clickdata.target.dataset.totime = form.totime.value;
//     }
//   } else {
//     clickdata.target.dataset.fortime = form.fortime.value;
//     if(form.totime.value == ""){
//       clickdata.target.dataset.totime = "入力なし";
//     }else{
//       clickdata.target.dataset.totime = form.totime.value;
//     }
//   }
//
// 	//メモ
// 	if(form.memo.value == ""){
// 		clickdata.target.dataset.memo = "入力なし";//あとで消す
// 	} else {
// 		clickdata.target.dataset.memo = $('#form [name=memo]').val();
// 	}
//   createEvent(clickdata);
// return false;
// }

function showEvent(e) {
    for ( i = 0; i < config.showe; i++) {

      const eventHtml = createEvent(e)
      const sece = document.createElement('section')
      sece.id = "events"
      sece.innerHTML = eventHtml
      document.querySelector('#event').appendChild(sece)
    }
}

function createEvent(e) {
  let eventHtml = ''
  eventHtml += `<div id = "eventdate">日付;${e.target.dataset.date}</div>`
  eventHtml += `<div id = "evevntname">イベント名:${e.target.dataset.eventname}</div>`
  eventHtml += `<div id = "eventtime">時間:${e.target.dataset.fortime} ~ ${e.target.dataset.totime}</div>`
  eventHtml += `<div id = "memo">メモ:${e.target.dataset.memo}</div>`
  return eventHtml
}

function deleteEvent(id_name) {
	var dom_obj = document.getElementById(id_name);
	var dom_obj_parent = dom_obj.parentNode;
	dom_obj_parent.removeChild(dom_obj);
}

function comparison(clickdata, e){
  if(clickdata.target.dataset.date ==  e.targeto.dataset.date && clickdata.target.dataset.eventname ==  e.targeto.dataset.eventname
    && clickdata.target.dataset.fortime ==  e.targeto.dataset.fortime && clickdata.target.dataset.totime ==  e.targeto.dataset.totime
    && clickdata.target.dataset.memo ==  e.targeto.dataset.memo){
      return true
  }else{
    return false
}
}


window.onload = function() {
  document.querySelector('#prev').addEventListener('click', moveCalendar)
  document.querySelector('#next').addEventListener('click', moveCalendar)

  const Event = document.querySelector("#event")
  const form = document.querySelector("#form")//#formをformとしておく

  document.addEventListener("click", function(e) {
      if(e.target.classList.contains("calendar_td")) {
          alert( e.target.dataset.date)
      }
  })

  showCalendar(year, month);
}
$(".link").click((e) => console.log($(e.currentTarget).data("id")));
