import ev from "./events.js";

ev.on("testEvent", () =>{
  console.log("ouviu também")
});


ev.emit("testEvent", "qtacontecendo");

//se o ev.on estiver depois do emit, ele nao vai ouvir

