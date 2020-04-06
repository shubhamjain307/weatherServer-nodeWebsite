// console.log('Client side js')

// fetch('http://puzzle.mead.io/puzzle').then((res)=>{

//     res.json().then((data)=>{
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=delhi').then((res)=>{

//    res.json().then((data)=>{
//        if(data.error){
//            console.log(data.error);
//        }else{
//         console.log(data)
//        }
       
//    })

// })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const value = search.value;
    messageOne.textContent = 'loading....';
    messageTwo.textContent = '';

        fetch('http://localhost:3000/weather?address='+value).then((res)=>{

        res.json().then((data)=>{
            if(data.error){
                messageOne.textContent =data.error;
                messageTwo.textContent = '';

                //console.log(data.error);
            }else{
                messageOne.textContent ='Weather:'+data.weather;
                messageTwo.textContent = 'Location:'+data.address;
                //console.log(data)
            }
            
        })

    })
})