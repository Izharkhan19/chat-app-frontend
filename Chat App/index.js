import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container-main");

const name = prompt("Enter your name to join.");
socket.emit("new-user-joined", name);
