'use strict';  //use strict:厳格モード->宣言後の記述ミスをエラーとして表示してくれる機能
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    //ブロック句
    if (userName.length === 0) {
        //名前が空の時は処理を終了する
        return;
    }
    
    //TODO 診断結果表示エリアの作成
    resultDivided.innerText = '';
    
    //headerDividedの作成
    //診断結果のタグ作成
    const headerDivided = document.createElement('div');
    headerDivided.setAttribute('class', 'card-header');
    headerDivided.innerText = '診断結果';   

    //bodyDividedの作成
    //診断結果の本文をまとめるタグ作成
    const bodyDivided = document.createElement('div');
    bodyDivided.setAttribute('class', 'card-body');

    //診断結果の本文を出力するタグ作成
    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivided.appendChild(paragraph);

    //resultDividedにBootstrapのスタイルを適用する
    resultDivided.setAttribute('class', 'card');
    resultDivided.setAttribute('style', 'max-width: 700px;');

    //headerDividedとbodyDividedをresultDividedに流し込む
    resultDivided.appendChild(headerDivided);
    resultDivided.appendChild(bodyDivided);

    // const header = document.createElement('h3');
    // header.innerText = '診断結果';
    // resultDivided.appendChild(header);
    // //結果表示
    // const paragraph = document.createElement('p');
    // const result = assessment(userName);
    // paragraph.innerText = result;
    // resultDivided.appendChild(paragraph);
    
    //TODOツイートエリアの作成
    tweetDivided.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + 
    encodeURIComponent('あなたのいいところ') + 
    '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}

//テキストフィールド上でEnterが押された時にも診断が始まるようにする
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        //TOOD ボタンのonclick処理を呼び出す
        assessmentButton.onclick();
    }
}
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment (userName) {
    //TODO:診断処理を実装する
    let sumOfCharCode = 0;
    //全文字の文字コードを取得してそれを足し合わせる
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('{userName}', userName);
    return result;
}

//テストケース
//第１引数->trueになるテストケース
//第２引数->エラーメッセージ
console.assert(
    assessment('大郎') ===
    '大郎のいいところはユニークさです。大郎だけのその特徴が皆を楽しくさせます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

//テストケース
console.assert(
    assessment('大郎') === assessment('大郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)
