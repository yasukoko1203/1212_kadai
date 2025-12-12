import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved } 
    from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  
    
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // RealtimeDBに接続
const dbRef = ref(db, "chat"); // RealtimeDB内の"chat"を使う

// データ登録(Click)
$("#send").on("click", function () {

    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const min = d.getMinutes();

    const msg = {
        uname: $("#uname").val(),
        text: $("#text").val(),
        time: `${month}/${day} ${hour}:${min}`
    // 日時を取得

    };
    const newPostRef = push(dbRef); // ユニークKEYを生成
    set(newPostRef, msg);           // "chat"に値をセットする

    // 送信後に入力欄を空にする
    $("#uname").val("");
    $("#text").val("");
});

// データ登録(Enter)
// ※ここにEnterキーを押したときの処理を追加する場合は記述します

$("#text").on("keydown",function(e){
    if (e.keyCOde === 13){
        $("#send").trigger("click");
    }
});



// 最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
onChildAdded(dbRef, function (data) {
    const msg = data.val();
    const key = data.key; // 削除や更新に使うキー

    let html = `
        <div class="msg">
            <p>${msg.uname}</p>
            <p>${msg.text}</p>
            <p style="font-size:10px; color:#888;">${msg.time}</p> 
        </div>
    `;

    // jQueryを使って画面上に表示をする
    $("#output").append(html);
});