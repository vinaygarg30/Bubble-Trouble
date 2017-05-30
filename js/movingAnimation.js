/**
 * Created by verma.prashant.131 on 30/3/15.
 */

var paused = false;

function instantiate(element, time, xAxis, yAxis)
{
    if(!paused)
    {
        if(exists(element.id) == false)
        return;

        element.style.left = parseInt(element.style.left) + xAxis + 'px';
        element.style.top = parseInt(element.style.top) + yAxis + 'px';
    }
    return setTimeout(function(){instantiate(element, time, xAxis, yAxis)}, time);
}

function instantiateWithParent(element, parentElement,  time, xAxis, yAxis)
{
    if(!paused)
    {
        var xPos = parseInt(parentElement.style.left) + ( parseInt(parentElement.style.width) /2);
        var yPos = parseInt(parentElement.style.top);

        //var yPos = screen.height - parseInt(parentElement.style.bottom) - parseInt(parentElement.style.height);
        //alert(screen.height);

        element.style.left = xPos + 'px';
        element.style.top = yPos + 'px';

        return instantiate(element, time, xAxis, yAxis);
    }
    return null;
}

function removeElementAndClearTimeoutAfterTime(element, timeout, time)
{
    setTimeout(function(){removeElement(element, timeout)}, time);
}

function removeElement(element, timeout)
{
    clearTimeout(timeout);
    element.parentNode.removeChild(element);
}

function moveHorizontal(element, xAxis)
{
    element.style.left = parseInt(element.style.left) + xAxis + 'px';
}

function moveVertical(element, yAxis)
{
    element.style.top = parseInt(element.style.top) + yAxis + 'px';
}

//call this method to move elements horizontally infinitely
function horizontalLooping(element, time, xAxis , xMin, xMax)
{
    if(!paused)
    {
        if(parseInt(element.style.left) >= xMax || parseInt(element.style.left) <= xMin)
            xAxis = -xAxis;

        moveHorizontal(element, xAxis);
    }
    setTimeout(function(){horizontalLooping(element, time, xAxis , xMin, xMax)}, time);

}


function isOverlapping(rect1, rect2)
{
    var left1 = parseInt(rect1.style.left);
    var width1 = parseInt(rect1.style.width);
    var left2 = parseInt(rect2.style.left);
    var width2 = parseInt(rect2.style.width);

    var top1 = parseInt(rect1.style.top);
    var height1 = parseInt(rect1.style.height);
    var top2 = parseInt(rect2.style.top);
    var height2 = parseInt(rect2.style.height);

    if(((left1 <= left2 && (left1+width1) >= left2 ) || (left1 <= (left2+width2) && (left1+width1) >= (left2+width2) ))
        && ((top1 <= top2 && (top1+height1) >= top2 ) || (top1 <= (top2+height2) && (top1+height1) >= (top2+height2) )))
        return true;
    else
        return false;
}

function removeElementByBoundary(element, timeout, yMin, yMax)
{
    var top = parseInt(element.style.top);
    var height = parseInt(element.style.height);

    if((top + height) < yMin)
    {
        element.parentNode.removeChild(element);
        clearTimeout(timeout);
    }
    else if(top > yMax)
    {
        element.parentNode.removeChild(element);
        clearTimeout(timeout);
    }
    else
    {
        setTimeout(function(){removeElementByBoundary(element, timeout, yMin, yMax)},500);
    }
}

//includes min but excludes max
function getRandom(min, max)
{
    return parseInt(Math.random() * (max - min) + min);
}


function exists(id)
{
    var element =  document.getElementById(id);
    //alert(id + "-"+(typeof(element) != 'undefined' && element != null));
    if (typeof(element) != 'undefined' && element != null)
    {

        return true;
    }
    else
    return false;
}

