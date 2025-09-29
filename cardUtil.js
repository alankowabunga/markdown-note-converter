addNewPerson = () => {
  let issueBlock = document.querySelector("#issue-block");
  let colNumber = document.querySelectorAll("#issue-block .col").length;

  // 創建新的 .col 節點(若全部直接用 innerHTML 會將原有的節點全部刷新)
  let newCol = document.createElement("div");
  newCol.className = "col";

  newCol.innerHTML = getNewColHTML(colNumber);

  issueBlock.appendChild(newCol);
};

getNewColHTML = (colNumber) => {
  return `
    <div class="card border-primary mb-3" style="max-width: 18rem">
      <div class="card-header d-flex flex-row">
        <h5 class="me-2">姓名: </h5><input type="text" class="form-control form-control-sm w-50 person${
          colNumber + 1
        }">
      </div>

      <div class="card-body text-dark">
        <h5 class="card-title text-decoration-underline">議題</h5>
        <textarea class="form-control mb-3 issue${
          colNumber + 1
        }" oninput="autoResize(this)"></textarea>

        <h5 class="card-title text-decoration-underline ">其他</h5>
        <textarea class="form-control mb-3 other${
          colNumber + 1
        }" oninput="autoResize(this)"></textarea>
      </div>
    </div>
`;
};

clearAllPerson = () => {
  keepFirstPerson();
  resetAllInput();
  resetIssueAndOther();
  resetTextareaHeight();
};

keepFirstPerson = () => {
  var cols = document.querySelectorAll("#issue-block .col");
  for (var i = 1; i < cols.length; i++) {
    cols[i].parentNode.removeChild(cols[i]);
  }
};

resetAllInput = () => {
  // 清空 id 為 "myTextarea" 的 textarea 的值
  document.querySelector("#general-task").value = "";
  document.querySelector("#general-aob").value = "";
  document.querySelector(".person1").value = "";
  document.querySelector(".issue1").value = "";
  document.querySelector(".other1").value = "";

  // 清空 class 為 "myInput" 的 input 的值
  var inputs = document.querySelectorAll("input");
  inputs.forEach(function (input) {
    input.value = "";
  });
};
// auto resize for input height & reset
let initialHeight;
autoResize = (element) => {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";

  if (!initialHeight) {
    initialHeight = element.scrollHeight + "px";
  }
};

resetTextareaHeight = () => {
  let textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    textarea.style.height = initialHeight;
  });
};
