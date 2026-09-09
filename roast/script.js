const roasts=[
  'Your Home Screen has evolved into a museum of good intentions.',
  'Safari tabs are now a distributed archive of unfinished thoughts.',
  'You built a Shortcut to save eight seconds and spent forty minutes naming it.',
  'The terminal accepted the command. It has chosen not to explain the consequences.',
  'Your breakpoint has been promoted to decorative UI.',
  'The branch name is longer than the feature description. Enterprise has arrived.',
  'More screen. Same plan. Bold strategy.',
  'You checked the time. Technology has reached another milestone.',
  'A tiny computer on your wrist, primarily deployed for tiny decisions.',
  'You downloaded the PDF for later. Later has now become a location.'
];
let current=Math.floor(Math.random()*roasts.length);
const text=document.getElementById('roastText');
const counter=document.getElementById('counter');
text.textContent=roasts[current];
counter.textContent=String(current+1).padStart(2,'0');
document.getElementById('roastButton').addEventListener('click',()=>{
  let next=current;
  while(next===current) next=Math.floor(Math.random()*roasts.length);
  current=next;
  text.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:260});
  text.textContent=roasts[current];
  counter.textContent=String(current+1).padStart(2,'0');
});
document.getElementById('year').textContent=new Date().getFullYear();
