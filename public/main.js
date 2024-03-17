const socket=io()

socket.on('clients-total',(data)=>{
    console.log(data)
    document.getElementById('client-total').innerText=`Total Rangers: ${data}`
})

const messageContain=document.getElementById('message-container')
const nameInp=document.getElementById('name-input')
const messageForm=document.getElementById('message-form')
const messageInp=document.getElementById('message-input')

const fancyNames=["theRock", "soapMcTavish","captainPrice", "gojo", "deathNote", "nakamura", "yuri","demonSlayer","unoStar","toxicAF"]

const index=Math.floor(Math.random() * 10) + 0;

nameInp.value=fancyNames[index]


function sendMessage(){
   // clearType()
    const data={
        name:nameInp.value,
        message:messageInp.value,
        time:new Date()
    }
    socket.emit('message',data)
    addMessage(true,data)
    messageInp.value=""
}

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(messageInp.value=='')
        return;
    sendMessage()
})

socket.on('chat-message',(data)=>{
    console.log(data)
    addMessage(false,data)
})

function addMessage(isOwnMessage,data) {
    //clearType()
    const element= ` <li class=${isOwnMessage?"message-right":"message-left"}>
    <p class="message">
      ${data.message}
      <span>${data.name} ● ${moment(data.time).fromNow()}</span>
    </p>
  </li>`

  messageContain.innerHTML+=element
  scrollBottom()
}

const scrollBottom=()=>{
    messageContain.scrollTo(0,messageContain.scrollHeight)
}

scrollBottom()

const emitFeedback=()=>{
    socket.emit('feedback',{
        feedback:`${nameInp.value} is typing`
    })
}

messageInp.addEventListener('focus',()=>{
    emitFeedback()
})

messageInp.addEventListener('keypress',()=>{
    emitFeedback()}
)

messageInp.addEventListener('focusout',()=>{
    //clearType()
    socket.emit('feedback',{
        feedback:''
    })
})


function clearType(){
    document.querySelectorAll('li.message-feedback').forEach((ele)=>{
        ele.parentNode.removeChild(ele)
    })
}