"use client"
import "./chats.css"
import React, { useEffect, useState ,useRef,useMemo} from 'react'
import { useSearchParams } from 'next/navigation';
import { UseFirebase } from '@/auth/firebase';
import { getRecentChats } from './fetchRecentChats';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ArrowLeft } from 'lucide-react';
import debounce from "lodash.debounce";
import { io } from "socket.io-client";

const Chats = () => {
  const [recieverName, setReceiverName] = useState(null)
  const [chats, setChats] = useState([]);
  const [CHATID,setChatID] = useState(null);
  const [message, setMessage] = useState("");
  const inputref = useRef(null);
  const [ReceiverId, setReceiverId] = useState(null);
  const [Recentchats, setRecentChats] = useState([]);
  
  const searchParams = useSearchParams();
  const firebase = UseFirebase();
  const senderId = searchParams.get('senderId');
  const receiverId = searchParams.get('receiverId');
  const exists = searchParams.get('exists')
  const [isLoading, setIsLoading] = useState(true);

  const [showChatforSmallScreen, setChatForSmallScreen] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  
  
  const [chatExists, setChatExists] = useState(exists==="true" ? true : false);
  
  const socketRef = useRef(null);

useEffect(() => {
  if (!socketRef.current) {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });
    socketRef.current.on("receiveMessage", (data) => {
      console.log("📩 New message received via socket:", data);
      document.getElementById("message").scrollIntoView({ behavior: "smooth" });
      // ✅ Add the message to chat state
       setChats(prev => [...prev, { id: data.chatId, content: data.content, sender: data.senderId, timestamp: new Date() }]);
    });
  }

  return () => {
    // Clean up on unmount
    socketRef.current?.disconnect();
    socketRef.current = null;
  };
}, []);
  
  useEffect(() => {
    async function getReceiverName() {
      const data = await firebase.getUserByUID(receiverId);
      setReceiverName(data.Name)

    }
    async function getChatID() {
      const chatExists = await fetch(`http://localhost:5000/chat/checkchat?senderId=${senderId}&receiverId=${receiverId}`);
      const chatData = await chatExists.json();
      setChatID(chatData.chatId);
      return chatData.chatId;
    }
    async function getChat(chatID) {
      setLoadingChats(true);
      const chat = await fetch(`http://localhost:5000/chat/getchat?chatId=${chatID}`);
      const res = await chat.json();
      if (res.error) {
        setLoadingChats(false);
        console.error("Error fetching chat:", res.error);
        return;
      }
      console.log(res)
      setLoadingChats(false);
      setChats(res)
    }
    if (exists=="true") {
      const func = async () => {
        const chatid = await getChatID();
        getChat(chatid);

      }
      func()
    }
    else{
      setLoadingChats(false); 
    setChats([]);  
    }
    getReceiverName()
  }, [])

useEffect(() => {
  if (firebase.user && firebase.user.uid) {
    getRecentChats(firebase.user.uid, firebase)
      .then((data) => {
         setIsLoading(false);
        setRecentChats(data);
      })
      .catch((error) => {
        console.error("Error fetching recent chats:", error);
      });
  }
}, [firebase.user]);


const createChat = async () => {
  try {
    const response = await fetch(`http://localhost:5000/chat/newchat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        senderId,
        receiverId,
        message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error creating chat:", data.error);
      return;
    }

    // Save new chatId and update UI
    setChatID(data.chatId);
    setChatExists(true);

    inputref.current.value = "";
    setMessage("");

    // Add the new message to UI
    setChats(prev => [
      ...prev,
      {
        id: data.messageId,
        content: message,
        sender: firebase.user.uid,
        timestamp: new Date()
      }
    ]);
    return data.chatId; // Return the new chatId for further use
  } catch (err) {
    console.error("Network error during createChat:", err);
  }
};


  const handleSubmit = async () => {
    if (!message.trim()) return; // Prevent sending empty messages
 
    
    if(!chatExists) {
      const id=await createChat()
      if(!id) {
        console.error("Failed to create chat");
        return;
      }
       socketRef.current.emit("joinChat", {
        chatId: id,
        userId: firebase.user.uid,
        otherUserId: receiverId,
      });
      socketRef.current.emit("sendMessage", {
        CHATID,
        senderId: firebase.user.uid,
        content: message,
        timestamp: new Date(),
      });
      return 
    }
    try {
      socketRef.current.emit("joinChat", {
        chatId: CHATID,
        userId: firebase.user.uid,
        otherUserId: receiverId,
      });
      const response = await fetch(`http://localhost:5000/chat/savechat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          senderId:firebase.user.uid,
          message,
          chatId: CHATID
        })
      });
      const data = await response.json();

       socketRef.current.emit("sendMessage", {
        chatId: CHATID,
        senderId: firebase.user.uid,
        content: message,
        timestamp: new Date(),
      });
      inputref.current.value = ""; 
      if (response.ok) {
        // setChats(prev => [...prev, { id: data.messageId, content: message, sender: firebase.user.uid, timestamp: new Date() }]);
        setMessage("");
      } else {
        console.error("Error sending message:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async function loadChat(chatID) {
    setLoadingChats(true);
      const chat = await fetch(`http://localhost:5000/chat/getchat?chatId=${chatID}` );
      const res = await chat.json();
      if (res.error) {
        console.error("Error fetching chat:", res.error);
        setLoadingChats(false);
        return;
      }
      setLoadingChats(false);
      setChats(res)
    }

  const displayChat = (e) => {
    setChatID(null);
    setReceiverName(null);
    setChats([]);
    setMessage("");
    socketRef.current.emit("joinChat", {
      chatId: e.currentTarget.getAttribute('data-chat-id'),
      userId: firebase.user.uid,
    })
    const chatId = e.currentTarget.getAttribute('data-chat-id');
    const otherUserName = e.currentTarget.getAttribute('data-other-user-name');
    const rec = e.currentTarget.getAttribute('data-receiver-id');
    setReceiverId(rec)
    setChatID(chatId);
    setReceiverName(otherUserName);
    setChatExists(true);
    loadChat(chatId);
    if(window.screen.width<640){
      setChatForSmallScreen(true);
    }
  }


  const renderedRecentChats = useMemo(() => {
  return Recentchats.map(chat => (
    <div
      key={chat.chatId}
      className="flex items-center gap-3 px-4 py-3 border-b border-gray-700 hover:bg-green-100/40 cursor-pointer transition"
      data-chat-id={chat.chatId}
      data-other-user-name={chat.otherUserName}
      data-receiver-id={chat.otherUserId}
      onClick={displayChat}
    >
      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
        {chat.otherUserName?.[0] || "?"}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-white">{chat.otherUserName}</div>
        <div className="text-xs text-gray-400 truncate">
          {chat.lastMessage.content.slice(0, 15)}
          {chat.lastMessage.content.length > 20 ? '...' : ''}
        </div>
      </div>
      <div className="text-xs text-gray-400">
        {new Date(chat.lastMessage.timestamp).toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>
    </div>
  ));
}, [Recentchats]); 

 

  return (
    <div className='min-h-[90vh]  min-w-screen flex max-sm:overflow-x-hidden chat-page '>
      {/* Chat List */}
      <div className={`chat-list overflow-hidden w-1/3 min-w-[260px] max-w-xs max-sm:min-w-full bg-black backdrop-blur-md border-r border-gray-700 flex flex-col ${recieverName ? " max-sm:hidden" : ""} overflow-y-scroll`}>
        <h2 className="text-2xl p-4 max-h-16 font-bold text-green-700 max-sm:text-center  border-b border-gray-700 bg-black">Chats</h2>
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
  // 🔄 Skeleton Loader when loading
  <div className="p-4 space-y-3">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="flex items-center gap-3 mb-4">
        <Skeleton circle height={40} width={40} baseColor="#1f2937" highlightColor="#374151" />
        <div className="flex-1">
          <Skeleton height={14} width="60%" baseColor="#1f2937" highlightColor="#374151" />
          <Skeleton height={10} width="80%" baseColor="#1f2937" highlightColor="#374151" />
        </div>
        <Skeleton height={10} width={50} baseColor="#1f2937" highlightColor="#374151" />
      </div>
    ))}
  </div>
) : Recentchats.length === 0 ? (
  // 🚫 No recent chats found
  <div className="text-gray-400 text-sm text-center p-4">
    No recent chats found.
  </div>
) : (
  // ✅ Render recent chats
  renderedRecentChats
)}


        </div>
      </div>
      {/* Chat Area */}
      {
        recieverName ? (
           <div className={`chat-area flex-1 flex flex-col bg-gradient-to-r  max-h-[90vh] from-emerald-900/80 from-0% to-100% to-black backdrop-blur-lg max-sm:min-h-[90vh] overflow-y-scroll max-sm:max-h-[90vh]`  }>
       <div className="border-b border-gray-700 p-4 flex items-center gap-3 bg-black max-sm:sticky max-sm:top-0 max-sm:z-10 ">
  {/* Back Button for small screens */}
  {recieverName && (
    <button
      onClick={() =>{ 
        setChatForSmallScreen(false);
    setReceiverName(null);
    setReceiverId(null);
    setChats([]);
    getRecentChats(firebase.user.uid,firebase).then((data) => {
        setRecentChats(data);
        
      }).catch((error) => {
        console.error("Error fetching recent chats:", error);
      });
      }}
      className="sm:hidden p-2 mr-2 rounded-full hover:bg-green-800 text-white"
    >
     <ArrowLeft className="w-5 h-5" />
    </button>
  )}
  <div className="w-10 h-10 max-h-16 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">{recieverName[0]}</div>
  <div>
    <div className="font-semibold text-white">{recieverName || ""}</div>
  </div>
</div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3 area">
  {loadingChats ? (
    [...Array(5)].map((_, i) => (
  <div
    key={i}
    className={`max-w-[70%] px-4 py-3 rounded-2xl shadow bg-gray-700 animate-pulse ${
      i % 2 === 0 ? 'self-start' : 'self-end'
    }`}
  >
    <div className="h-3 w-32 bg-gray-600 rounded mb-2"></div>
    <div className="h-2 w-24 bg-gray-600 rounded"></div>
  </div>
))
  ) : (
    chats.map(msg => (
      <div
        key={msg._id}
        className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm ${
          msg.sender === firebase.user.uid
            ? 'self-end bg-green-500 text-white'
            : 'self-start bg-white/80 text-green-900 border border-green-200'
        }`}
        id="message"
      >
        {msg.content}
        <div className="text-xs text-right mt-1 opacity-60">
          {new Date(msg.timestamp).toLocaleString([], {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </div>
      </div>
    ))
  )}
</div>

        <div className="p-4 border-t  border-gray-700 bg-black/80 flex gap-2 items-center justify-center">
          <input type="text" ref={inputref} className="w-5/6 rounded-full px-4 py-2 text-white  focus:ring-2 focus:ring-gray-700 outline-none bg-gray-800" placeholder="Type a message..." onChange={debounce((e) => setMessage(e.target.value), 300)}/>
          <button className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-green-700 transition" onClick={handleSubmit}>Send</button>
        </div>
      </div>
        ) : (
  //  Placeholder UI when no chat is selected
  <div className="flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-r from-emerald-900/80 to-black text-white">
    <div className="p-6">
      <div className="text-6xl mb-4 animate-bounce">💬</div>
      <h2 className="text-3xl font-bold mb-2">No Chat Selected</h2>
      <p className="text-gray-300 text-sm max-w-md mx-auto">
        Choose a conversation from the left panel or start a new chat to begin messaging.
      </p>
    </div>
    <div className="mt-6">
      <svg className="w-48 h-48 text-green-500 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
      </svg>
    </div>
  </div>
)
      }
     
    </div>
  )
}

export default Chats