let current="inbox";
let selectedIndex=null;

let colors=["#0a84ff","#ff453a","#30d158","#ff9f0a","#bf5af2"];

let defaultData={
  inbox:[
    {
      from:"Claims Dept",
      subject:"Claim Approved – Policy PL-558921",
      body:"Your life insurance claim has been approved. Amount will be credited within 3 working days.",
      read:false, star:false
    },
    {
      from:"Fraud Analysis Unit",
      subject:"Verification Required – High Value Claim",
      body:"Please review supporting documents for the recent high-value claim flagged by the system.",
      read:false, star:true
    },
    {
      from:"Policy Services",
      subject:"Annual Policy Renewal Reminder",
      body:"Your policy is due for renewal. Kindly review updated premium details.",
      read:true, star:false
    }
  ],
  sent:[],
  drafts:[]
};

let data=JSON.parse(localStorage.getItem("gmailData"))||defaultData;
function save(){localStorage.setItem("gmailData",JSON.stringify(data));}

function switchFolder(e,folder){
  current=folder;
  document.querySelectorAll(".menu").forEach(x=>x.classList.remove("active"));
  e.target.classList.add("active");
  renderList();
}

function renderList(){
  inboxCount.innerText=data.inbox.length;
  sentCount.innerText=data.sent.length;
  draftCount.innerText=data.drafts.length;

  mailList.innerHTML="";
  let mails=current==="starred"?data.inbox.filter(m=>m.star):data[current];

  mails.forEach((mail,i)=>{
    mailList.innerHTML+=`
      <div class="mailItem ${mail.read?"":"unread"}" onclick="openMail(${i})">
        <div class="avatar">${mail.from[0]}</div>
        <div class="mailContent">
          <div class="sender">${mail.from}</div>
          <div class="snippet">${mail.subject}</div>
        </div>
        <div class="time">${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
      </div>`;
  });
}

function openMail(i){
  selectedIndex=i;
  let mails=current==="starred"?data.inbox.filter(m=>m.star):data[current];
  let m=mails[i];
  m.read=true;
  save();

  mailTitle.innerText=m.subject;
  mailMeta.innerText="From: "+m.from;
  mailBody.innerText=m.body;
  headerAvatar.innerText=m.from[0];

  renderList();
}

function openCompose(){composeModal.style.display="block";}
function closeCompose(){composeModal.style.display="none";}

function sendMail(){
  data.sent.unshift({from:"Me",subject:subject.value,body:body.value,read:true,star:false});
  save();closeCompose();showToast("Mail Sent");
}

function saveDraft(){
  data.drafts.unshift({from:"Me",subject:subject.value,body:body.value,read:true,star:false});
  save();closeCompose();showToast("Saved to Drafts");
}

function deleteCurrent(){
  if(selectedIndex===null)return;
  data[current].splice(selectedIndex,1);
  save();renderList();
}

function starCurrent(){
  if(selectedIndex===null)return;
  data[current][selectedIndex].star=!data[current][selectedIndex].star;
  save();renderList();
}

function showToast(msg){
  toast.innerText=msg;
  toast.style.display="block";
  setTimeout(()=>toast.style.display="none",2000);
}

function closeWindow(){
  document.querySelector(".macWindow").style.display="none";
}
function minimizeWindow(){
  document.querySelector(".main").style.display="none";
}
function toggleFullscreen(){
  document.querySelector(".macWindow").classList.toggle("fullscreen");
}

renderList();