var names = ["HEN", "DOG", "ROCK", "CAT", "FAN", "GOAT", "ICE", "JOKER", "KITE", "LAMB", "MAKER", "NAME", "RUN", "SWAN", "TEA"];// Total names to complete
var currentNames = ["HEN", "DOG", "ROCK", "CAT", "FAN", "GOAT", "ICE", "JOKER", "KITE", "LAMB", "MAKER", "NAME", "RUN", "SWAN", "TEA"];// Names left to complete
var name = "HEN";//Name to be completed
var currentName = "HEN";// Name left to complete
var bubbleTimeDiff = 2000;//time difference between two continuous bubbles
var bubbleXMin = 0;// lowest xAxis values for bubble
var bubbleXMax = screen.width - 45;// highest xAxis values for bubble
var bulletInstantiate = null;//latest instance of bullet element
var lastSpellingBubbleTime = 0;// last time when spelling bubbles occured
var spellingBubbleTimeDiff = 8000;// time difference between two continuous occurence of spelling bubble
var lastBubblePos = -100;// position of last instantiated bubble
var bubbleID = 1;//id of bubbles in scene, limit is 100
var bubblesInfo = new Array();//carries info about bubbles
var bubbleSpeedTime = 30;//time for speed of bubbles
var bubbleSpeedDist = 2;// distance for speed of bubbles
var levelTime = 60*1000;// initial time for level
var life = 5;// initial lives given to player
var pauseMenu = document.getElementById("pauseMenu").cloneNode(true);
var gameOverMenu = document.getElementById("gameOverMenu").cloneNode(true);
var points = 0;

function onLoading()
{
    try{

        var realPauseMenu = document.getElementById("pauseMenu");
        realPauseMenu.parentNode.removeChild(realPauseMenu);

        var realGameOverMenu = document.getElementById("gameOverMenu");
        realGameOverMenu.parentNode.removeChild(realGameOverMenu);

        var butterflyElement = document.getElementById("butterfly");
        butterflyElement.style.top = (screen.height - parseInt(butterflyElement.style.bottom) - parseInt(butterflyElement.style.height)) + "px";
        
        setNewName();
        horizontalLooping(butterflyElement,  7, 1, 0, screen.width - parseInt(butterflyElement.style.width));
        instantiateBubblesWithTime(bubbleTimeDiff);
        updateLevelTime();
        //setSpellingName();//sets spelling name according to variable 'name'
        butterflyHitCheck(document.getElementById("butterfly"));
        gameManager();
        createLife();
    }
    catch(e)
    {alert(e);}
}

function updateLevelTime()
{
    if(!paused)
    {
        levelTime -= 1000;
        document.getElementById("timePara").innerHTML = "" + (String)(levelTime/1000);
    }
    setTimeout(updateLevelTime, 1000);
}

function pausedParaOnClick()
{
    paused = !paused;
    var new_pauseMenu = pauseMenu.cloneNode(true);
    new_pauseMenu.style.visibility="visible";
    document.body.appendChild(new_pauseMenu);
}

function createLife()
{
    //var parentElement = document.getElementById("header");
    var parentElement = document.body;

    for(i = 1; i <= life; i++)
    {
        parentElement.appendChild(getLifeElement(i));
    }
}

function updateLife()
{
    //document.getElementById("lifePara").innerHTML = "Life: " + life;
}

function decLife()
{
    var lifeElement = document.getElementById("life"+life);
    lifeElement.parentNode.removeChild(lifeElement);
    life--;
}

function getLifeElement(num)
{
    var element = document.createElement("img");
    element.src = "images/bfly.gif";
    element.style.left = (7 + (25 * (num-1))) + "px";
    element.style.top = "10px";
    element.style.position = "fixed";
    element.style.height = "25px";
    element.style.width = "25px";
    element.id = "life" + num;

    return element;
}

function butterflyOnClick()
{
    try
    {
        var bulletElement = document.createElement("img");
        bulletElement.src = "images/bullet.png";
        bulletElement.id = "bul"+bubbleID;
        bulletElement.style.position = "absolute";
        bulletElement.style.top = "340px";
        bulletElement.style.left = "50px";
        bulletElement.style.height = "25px";
        bulletElement.style.width = "20px";
        bulletElement.style.visibility = "visible";
        bulletElement.parentNode = document.body.nodeType;
        document.body.appendChild(bulletElement);

        bulletInstantiate = instantiateWithParent(bulletElement,document.getElementById("butterfly"), 10, 0, -2);
        removeElementByBoundary(bulletElement, bulletInstantiate, 0, screen.height);
        bulletHitCheck(bulletElement);
    }
    catch(e)
    {alert(e);}
}

function resumeButtonOnClick()
{
    var resumeButton = document.getElementById("resumeButton");
    paused = !paused;
    resumeButton.parentNode.parentNode.parentNode.removeChild(resumeButton.parentNode.parentNode);
}

function instantiateBubblesWithTime(time)
{
    if(!paused)
    {
        try
        {
            lastSpellingBubbleTime += 1000;
            var char = "!";
            if(lastSpellingBubbleTime < spellingBubbleTimeDiff)// normal letter
            {
                char = getNormalLetter();
            }
            else//spelling letter
            {
                char = getSpellingLetter();
                lastSpellingBubbleTime = 0;
            }

            var bubbleElement = getBubbleElement(getRandomBubblePos(), char);
            var bubbleInstantiate = instantiate(bubbleElement, bubbleSpeedTime, 0, bubbleSpeedDist);
            bubblesInfo.push(bubbleElement.id);
            //alert(screen.height);
            removeBubbleByBoundary(bubbleElement, bubbleInstantiate, -100, screen.height);
        }
        catch(e)
        {alert(e);}
    }
    setTimeout(function(){instantiateBubblesWithTime(time)}, time)
}

function getNormalLetter()
{
    while(true)
    {
        var char = String.fromCharCode(65 + getRandom(0, 26));
        if(name.indexOf(char) == -1)
            return char;
    }
}

function getSpellingLetter()
{
    var char = currentName.charAt(getRandom(0, currentName.length));
    return char;
}

function getRandomBubblePos()
{
    while(true)
    {
        var random = getRandom(bubbleXMin, bubbleXMax);
        var min = lastBubblePos - 45;
        var max = lastBubblePos + 45;
        if(random < min || random > max)
        {
            lastBubblePos = random;
            return random;
        }
    }
}

function getBubbleElement(xPos, char)
{
    var element = document.createElement("img");
    element.id = getBubbleID();
    element.src = "images/" + char + ".png";
    element.style.width = "45px";
    element.style.height = "43px";
    element.style.top = "-50px";
    element.style.left = xPos+"px";
    element.style.position = "absolute";

    document.body.appendChild(element);
    return element;
}

function getBubbleID()
{
    if(bubbleID == 100)
        bubbleID = 1;
    return bubbleID++;
}


function removeBubbleByBoundary(element, timeout, yMin, yMax)
{
    if(!exists(element.id))
    {
        return;
    }
    var top = parseInt(element.style.top);
    var height = parseInt(element.style.height);

    if((top + height) < yMin)
    {
        removeBubbleInfo(element.id);
        element.parentNode.removeChild(element);
        clearTimeout(timeout);
    }
    else if(top > yMax)
    {
        removeBubbleInfo(element.id);
        element.parentNode.removeChild(element);
        clearTimeout(timeout);
    }
    else
    {
        setTimeout(function(){removeBubbleByBoundary(element, timeout, yMin, yMax)},500);
    }
}

function removeBubbleInfo(id)
{
    var skip = bubblesInfo.indexOf(id);
    var add = 0;
    var array = new Array();
    for(i = 0; i < bubblesInfo.length-1; i++)
    {
        if(skip == i)
            add = 1;
        array[i] = bubblesInfo[i+add];
    }

    bubblesInfo = array;

}

function bulletHitCheck(bulletElement)
{
    if(!paused)
    {
        if(exists(bulletElement.id) == false)
        {
            return;
        }

        for(i = 0; i < bubblesInfo.length; i++)
        {
            var bubble = document.getElementById(bubblesInfo[i].toString());
            if(isOverlapping(bubble, bulletElement))
            {
                levelTime += 5000;
                removeBubbleInfo(bubble.id);
                alphaShot(bubble.src);
                bubble.parentNode.removeChild(bubble);
                bulletElement.parentNode.removeChild(bulletElement);
            }
        }
    }
    setTimeout(function(){bulletHitCheck(bulletElement)}, 10);
}

function butterflyHitCheck(butterflyElement)
{
    if(!paused)
    {
        if(exists(butterflyElement.id) == false)
        {
            return;
        }

        for(i = 0; i < bubblesInfo.length; i++)
        {
            var bubble = document.getElementById(bubblesInfo[i].toString());
            if(isOverlapping(bubble, butterflyElement))
            {
                removeBubbleInfo(bubble.id);
                alphaCaught(bubble.src);
                bubble.parentNode.removeChild(bubble);
            }
        }
    }
    setTimeout(function(){butterflyHitCheck(butterflyElement)}, 10);
}

function setSpellingName()
{
    var textDiv = document.getElementById("textDiv");
    removeAllChildNodes("textDiv");
    for(i = 0; i < name.length; i++)
    {
        var span = getSpan();
        span.id = "span" + i;
        span.innerHTML = name.charAt(i);
        textDiv.appendChild(span);
    }
}

function removeAllChildNodes(id)
{
    var myNode = document.getElementById(id);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function getSpan()
{
    var span = document.createElement("span");
    span.style.fontSize = "27px";
    span.style.fontStretch = "expanded";
    span.style.fontWeight = "bold";
    span.style.fontFamily = "Papyrus";
    span.style.color = "white";

    return span;
}

function alphaShot(src)
{
    try
    {
        var char = src.split("/")[src.split("/").length-1].charAt(0);
        var index = name.indexOf(char);
        if(index == -1)
        {
            //not matched
            // alert("no match-"+char);
        }
        else
        {
            //matched
            var span = document.getElementById("span" + index);
            span.style.color = "red";
            currentName = removeChar(currentName, char);
        }
    }
    catch(e)
    {alert(e);}
}

function removeChar(string, char)
{
    var add = 0;
    var new_string = "";
    for(i = 0; i < string.length; i++)
    {
        if(string.charAt(i) == char)
            add = 1;
        new_string += string.charAt(i+add);
    }

    return new_string;
}

function alphaCaught(src)
{
    try
    {
        var char = src.split("/")[src.split("/").length-1].charAt(0);
        var index = name.indexOf(char);
        if(index == -1)
        {
            //var index_in = name.indexOf(currentName.charAt(0));
            //var span = document.getElementById("span" + index_in);
            //span.style.color = "red";
            //currentName = removeChar(currentName, currentName.charAt(0));--not used, instead of wrong spelling life is decreased

            //life--;
            decLife();
        }
        else
        {
            //matched
            var span = document.getElementById("span" + index);
            span.style.color = "green";
            currentName = removeChar(currentName, currentName.charAt(currentName.indexOf(char)));
            points++;
        }
    }
    catch(e)
    {alert(e);}
}

function setNewName()
{
    var index = getRandom(0, currentNames.length);
    var new_name = currentNames[index];
    name = new_name;
    currentName = new_name;
    removeElementFromCurrentNames(index);
    setSpellingName();
}

function gameManager()
{
    if(!paused)
    {
        if(currentName.length == 0)//current spelling is complete
        {
            setNewName();

        }

        if(levelTime == 0 || life == 0 || currentNames.length == 0)
        {
            //game over

            paused = !paused;
            var new_gameOverMenu = gameOverMenu.cloneNode(true);
            document.body.appendChild(new_gameOverMenu);
            new_gameOverMenu.style.visibility = "visible";

            points += (levelTime/1000) + life;

            document.getElementById("pointsPara").innerHTML = "Points: " + points;
        }

        //updateLife();
    }
    setTimeout(gameManager, 10);
}

function removeElementFromCurrentNames(index)
{
    if (index > -1) {
        currentNames.splice(index, 1);
    }
}

window.onload = onLoading;