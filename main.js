let modalContent = "";
let generalTask = ""; //注意/交辦事項
let generalAOB = ""; //共同
let allIssue = "";
let AOB = ""; //個人

function generateReport() {
  /* 
  1. 組合 issue & other
  2. 整理  [處理事項] & [其他]
  3. 全部組成 report
  */
  formIssueAndOther();
  formGeneralTaskAndAOB();
  formReport();
  resetIssueAndOther();
}

formReport = () => {
  let taskHandler = document.querySelector("#task-handler").value;
  let name = taskHandler == "" ? "昱任" : taskHandler;

  let report = "{{toc}}\n\n# 議題\n\n";
  report += allIssue;
  report += "## 處理事項\n";
  report += `>  ( ${name} )\n`;
  report += generalTask;
  report += "\n---\n\n\n";
  report += "# 其他\n";
  report += generalAOB;
  report += AOB;

  setModalContent(report);
  handleModal(report);
  resetIssueAndOther();
};

handleModal = (report) => {
  addModalContent(report);
  showModal();
};

copyContent = () => {
  navigator.clipboard.writeText(getModalContent());
};

addModalContent = (report) => {
  report = report.replace(/\n/g, "<br>"); // 將 \n 替換為 <br> 標籤
  $("#modalBody").html(report);
};

showModal = () => {
  $("#myModal").modal("show");
};

closeModal = () => {
  $("#myModal").modal("hide");
};

getFilename = () => {
  // 創建一個 Date 物件，代表當前日期和時間
  var currentDate = new Date();

  // 提取日期部分
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // 月份是從 0 開始計數，所以要加 1
  var year = currentDate.getFullYear();

  // 將日期部分組合成字串
  var formattedDate =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day;

  return `${formattedDate}_會議紀錄`;
};

createAndDownloadFile = (content, filename) => {
  // 創建 Blob 對象
  var blob = new Blob([content], { type: "text/plain" });

  // 創建下載連結
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // 將連結添加到 DOM 中
  document.body.appendChild(link);

  // 觸發點擊事件以下載檔案
  link.click();

  // 移除 DOM 中的連結元素
  document.body.removeChild(link);
};

formGeneralTaskAndAOB = () => {
  let general_task = document.querySelector("#general-task").value.split("\n");
  let general_aob = document.querySelector("#general-aob").value.split("\n");

  general_task.forEach((task) => {
    if (task == "") {
      return;
    }

    generalTask += `+ ${task}\n`;
  });
  general_aob.forEach((other) => {
    if (other == "") {
      return;
    }
    generalAOB += `+ ${other}\n`;
  });
};

formIssueAndOther = () => {
  let cols = document.querySelectorAll("#issue-block .col");
  cols.forEach(function (col, index) {
    var className = "person" + (index + 1);
    var issue = "issue" + (index + 1);
    var other = "other" + (index + 1);

    //name
    var personName = col.querySelector(`.${className}`).value;
    //issue
    var issueValue = col.querySelector(`.${issue}`).value.split("\n");
    //other
    var otherValue = col
      .querySelector(`.${other}`)
      .value.split("\n")
      .join("、");

    //製作 issue & other
    if (issueValue[0].trim() !== "") {
      allIssue += `### ${personName}\n`;
    }
    issueValue.forEach((issue) => {
      console.log("issue", issue);
      if (issue == "") {
        return;
      }
      allIssue += `+ ${issue}\n`;
    });

    allIssue += "\n\n";

    if (otherValue != "") {
      AOB += `+ (${personName}) ${otherValue}\n`;
    }
  });
};

setModalContent = (content) => {
  modalContent = content;
};

getModalContent = () => {
  return modalContent;
};

resetIssueAndOther = () => {
  report = "";
  allIssue = "";
  AOB = "";
  generalAOB = "";
  generalTask = "";
};
