
var pageNo = 0;


var instructionArr = ["Catch the bubbles to complete the given spelling. Tap butterfly to shoot flowers."
                      , "One point will be awarded for each correct bubble caught."
                      , "Catching wrong bubble will cost one life."
                      , "Shooting spelling bubbles will destroy that alphabet for that spelling."
                      , "Five seconds will be awarded for each bubble shot."
                      , "Game ends when no time is left or all lives are spent."
];
var imageInstructionArr = ["images/image1.png"
                          , "images/image2.png"
                          , "images/image3.png"
                          , "images/image4.png"
                          , "images/image5.png"
                          , "images/image6.png"];


function goLeft()
{
    --pageNo;
    elementVisibility();
    setInstruction();
}

function goRight()
{
    ++pageNo;
    elementVisibility();
    setInstruction();
}

function setInstruction()
{
    var instText = document.getElementById("instructionText");
    var instImage = document.getElementById("instructionImage");
    instImage.src = imageInstructionArr[pageNo];
    instText.innerHTML = instructionArr[pageNo];
}

function elementVisibility()
{
    var spanLeft = document.getElementById("spanLeft");
    var spanRight = document.getElementById("spanRight");
    if(pageNo == 0)
    {
        spanLeft.style.visibility = "hidden";
    }
    else
    {
        spanLeft.style.visibility = "visible";
    }

    if(pageNo == instructionArr.length-1)
    {
        spanRight.style.visibility = "hidden";
    }
    else
    {
        spanRight.style.visibility = "visible";
    }
}

function onLoading()
{
    pageNo = 0;
    var spanLeft = document.getElementById("spanLeft");
    spanLeft.style.visibility = "hidden";
    setInstruction();
}

window.onload = onLoading();
