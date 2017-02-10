/**
 * Created by Krzysztof on 22.05.2016.
 */
var ColumnWidth = 20;
var tablica = [];
var finish1 = false;
var finish2 = false;

var compsS = [];
var swapsS = [];
var compsB = [];
var swapsB = [];
var chart;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext('2d');

$('document').ready(function () {
    $('#canvas').hide();
    $('#canvas2').hide();
    $('#container').hide();
    $('#canvas').fadeIn();




});


function showData() {
    chart = new Highcharts.Chart(mychart);
    chart.series[0].setData(compsS);

    $('#container').slideToggle();



}

var mychart = {
    chart: {
        renderTo: 'container',
        type: 'column'

    },
    title: {
        text: 'TESTS',
        x: -20 //center
    },

    yAxis: {
        title: {
            text: 'Quantity'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: 'CompsSelection',
        data: compsS

    }, {
        name: 'SwapsSelection',
        data: swapsS

    },{
        name: 'CompsBubble',
        data: compsB

    },{
        name: 'SwapsBubble',
        data: swapsB

    }]
};


SelectionSort = function(array){


    this.array = array;
    this.oldarray = array;
    this.min = 0;
    this.i = 0;
    this.j = 0;
    this.len = array.length;
    this.ITERATING = false;
    this.toSwap_j = 0;
    this.index = 0;

    this.ComparisonCounter = 0;
    this.SwapCounter = 0;

    this.Update = function(){
        if(this.i<this.len){
            if(!this.ITERATING){
                //set minimum to this position
                this.min = this.i;
                this.j = this.i + 1;
                this.ITERATING = true;
            }

            //check the rest of the array to see if anything is smaller
            for (var j=this.j; j < this.len; j++){
                this.ComparisonCounter++;
                if (this.array[j] < this.array[this.min]){
                    this.min = j;
                }
                this.index = j;
                this.toSwap_j = this.min;
                this.oldarray = this.array.slice(0);
                this.Render();
                this.j++;
                return;

            }
            this.ITERATING = false;
            this.oldarray = this.array.slice(0);
            //if the this.minimum isn't in the position, swap it
            if (this.i != this.min){
                this.toSwap_j = this.min;
                this.SwapCounter++;
                swap(this.array, this.i, this.min);
            }else{
                this.toSwap_j = -1;
            }
            this.i++;
            this.Render();
        }else{
            if(finish1==true){

            }else{
                finish1 = true;
                compsS.push(this.ComparisonCounter);
                swapsS.push(this.SwapCounter);
            }

        }
    };

    this.Render = function(){
        ctx.clearRect(0,0,960,500);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.font="22px Arial";
        var x_position = 30;
        for(var i = 0; i < this.oldarray.length; i++){
            if(i == this.toSwap_j){
                ctx.fillStyle = "rgba(0,255,0,1)";
                ctx.fillRect(x_position, 400-this.oldarray[i],ColumnWidth,this.oldarray[i]);
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.fillText(i.toString(),x_position,400+50);
                ctx.fillStyle = "rgba("+ this.oldarray[i] +","+ this.oldarray[i] +","+ this.oldarray[i] +",1)";
                x_position+=40;
            }else if(i == (this.index)){
                ctx.fillStyle = "rgba(0,255,255,1)";
                ctx.fillRect(x_position, 400-this.oldarray[i],ColumnWidth,this.oldarray[i]);
                ctx.fillStyle = "rgba(255,255,255,1)";
                //ctx.fillText(this.oldarray[i],x_position,400);
                ctx.fillText(i.toString(),x_position,400+50);
                ctx.fillStyle = "rgba("+ this.oldarray[i] +","+ this.oldarray[i] +","+ this.oldarray[i] +",1)";
                x_position+=40;
            }
            else if(i == (this.i)){
            ctx.fillStyle = "rgba(255,255,0,1)";
            ctx.fillRect(x_position, 400-this.oldarray[i],ColumnWidth,this.oldarray[i]);
            ctx.fillStyle = "rgba(255,255,255,1)";
            //ctx.fillText(this.oldarray[i],x_position,400);
            ctx.fillText(i.toString(),x_position,400+50);
            ctx.fillStyle = "rgba("+ this.oldarray[i] +","+ this.oldarray[i] +","+ this.oldarray[i] +",1)";
            x_position+=40;
            }else if(i < this.i){
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.fillRect(x_position, 400-this.oldarray[i],ColumnWidth,this.oldarray[i]);
                ctx.fillStyle = "rgba(255,255,255,1)";
                //ctx.fillText(this.oldarray[i],x_position,400);
                ctx.fillText(i.toString(),x_position,400+50);
                ctx.fillStyle = "rgba(255,255,255,1)";
                x_position+=40;
            }else{
                ctx.fillStyle = "rgba(0,0,"+ this.oldarray[i] +",1)";
                ctx.fillRect(x_position, 400-this.oldarray[i],ColumnWidth,this.oldarray[i]);
                ctx.fillStyle = "rgba(255,255,255,1)";
                //ctx.fillText(this.oldarray[i],x_position,400);
                ctx.fillText(i.toString(),x_position,400+50);
                ctx.fillStyle = "rgba(255,255,255,1)";
                x_position+=40;
            }

        }
        //legend

        //zielony
        ctx.font="14px Arial";
        ctx.fillStyle = "rgba(0,255,0,1)";
        ctx.fillRect(30, 30,20,10);
        ctx.fillText("minimum",30+25,30+10);

        //żółty
        ctx.fillStyle = "rgba(255,255,0,1)";
        ctx.fillRect(30+1*160,30,20,10);
        ctx.fillText("index",30+25+1*160,30+10);

        //biały
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fillRect(30+2*160,30,20,10);
        ctx.fillText("posortowane elementy",30+25+2*160,30+10);

        ctx.fillStyle = "rgba(255,255,255,1)";
    };

};

BubbleSort = function(array){

    this.array = array;
    this.oldarray = array;
    this.min = 0;
    this.i = 0;
    this.j = 0;
    this.len = array.length;

    this.toSwap_j = 0;
    this.toSwap_j2 = 0;

    this.ComparisonCounter = 0;
    this.SwapCounter = 0;

    this.Update = function(){
        if(this.i<=this.len){
            for (var j = this.j; j < this.len - this.i; ++j)
            {
                this.ComparisonCounter++;
                if (this.array[j] > this.array[j + 1])
                {
                    this.SwapCounter++;
                    swap(this.array, j, j+1);
                    this.toSwap_j = j;
                    this.toSwap_j2 = j+1;
                    this.Render();


                    return;

                }
                this.toSwap_j = j;
                this.toSwap_j2 = j+1;
                this.Render();

                this.j++;
                return;
            }
            this.j = 0;
            this.oldarray = this.array;
            this.Render();
            this.i++;
        }else{
            finish2 = true;
            compsB.push(this.ComparisonCounter);
            swapsB.push(this.SwapCounter);

        }
    };

    this.Render = function(){
        ctx2.clearRect(0,0,960,500);
        ctx2.fillStyle = "rgba(255,255,255,1)";
        ctx2.font="22px Arial";
        var x_position = 30;
        for(var i = 0; i < this.oldarray.length; i++){
            if(i == this.toSwap_j){
                ctx2.fillStyle = "rgba(0,255,0,1)";
                ctx2.fillRect(x_position, 400-this.oldarray[i],ColumnWidth,this.oldarray[i]);
                ctx2.fillStyle = "rgba(255,255,255,1)";
                //ctx2.fillText(this.oldarray[i],x_position,400);
                ctx2.fillText(i.toString(),x_position,400+50);
                ctx2.fillStyle = "rgba("+ this.oldarray[i] +","+ this.oldarray[i] +","+ this.oldarray[i] +",1)";
                x_position+=40;
            }else if(i == this.toSwap_j2){
                ctx2.fillStyle = "rgba(255,255,0,1)";
                ctx2.fillRect(x_position, 400-this.oldarray[i],ColumnWidth,this.oldarray[i]);
                ctx2.fillStyle = "rgba(255,255,255,1)";
                //ctx2.fillText(this.oldarray[i],x_position,400);
                ctx2.fillText(i.toString(),x_position,400+50);
                ctx2.fillStyle = "rgba("+ this.oldarray[i] +","+ this.oldarray[i] +","+ this.oldarray[i] +",1)";
                x_position+=40;
            }else if(i > this.len - this.i -1){
                ctx2.fillStyle = "rgba(255,255,255,1)";
                ctx2.fillRect(x_position, 400-this.oldarray[i],ColumnWidth,this.oldarray[i]);
                ctx2.fillStyle = "rgba(255,255,255,1)";
                //ctx2.fillText(this.oldarray[i],x_position,400);
                ctx2.fillText(i.toString(),x_position,400+50);
                ctx2.fillStyle = "rgba(255,255,255,1)";
                x_position+=40;
            }else{
                ctx2.fillStyle = "rgba(0,0,"+ this.oldarray[i] +",1)";
                ctx2.fillRect(x_position, 400-this.oldarray[i],ColumnWidth,this.oldarray[i]);
                ctx2.fillStyle = "rgba(255,255,255,1)";
                //ctx2.fillText(this.oldarray[i],x_position,400);
                ctx2.fillText(i.toString(),x_position,400+50);
                ctx2.fillStyle = "rgba(255,255,255,1)";
                x_position+=40;
            }


        }
        //legend

        //zielony
        ctx2.font="14px Arial";
        ctx2.fillStyle = "rgba(0,255,0,1)";
        ctx2.fillRect(30, 30,20,10);
        ctx2.fillText("zamieniony elemnt 1",30+25,30+10);

        //żółty
        ctx2.fillStyle = "rgba(255,255,0,1)";
        ctx2.fillRect(30+160,30,20,10);
        ctx2.fillText("zamieniony elemnt 2",30+25+160,30+10);

        //biały
        ctx2.fillStyle = "rgba(255,255,255,1)";
        ctx2.fillRect(30+2*160,30,20,10);
        ctx2.fillText("posortowane elementy",30+25+2*160,30+10);

        ctx2.fillStyle = "rgba(255,255,255,1)";
    };

};



var algorithm;
var algorithm2;

var waitAnim;
var loopAnim;

function startAnimation() {
    finish1=false;
    finish2=false;
    $('#canvas').hide();
    $('#canvas2').hide();
    clearTimeout(waitAnim);
    clearTimeout(loopAnim);
    finish=false;
    ctx.save();
    ctx.clearRect(0,0,960,500);
    tablica = [];
    for (var j = 0; j < 23; j++){
        tablica.push(getRandomInt(0,340));
    }

    var tab_copy = tablica.slice(0);
    algorithm = new SelectionSort(tablica);
    algorithm2 = new BubbleSort(tab_copy);
    $('#canvas').fadeIn();
    $('#canvas2').fadeIn();


    animationLoop();

}


var tab2;
var tab3;

function waitAnimation() {

    ctx.save();
    ctx.clearRect(0,0,960,500);
    tab2 = [];
    for (var j = 0; j < 23; j++){
        tab2.push(getRandomInt(0,340));
    }

    ctx.clearRect(0,0,960,500);
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.font="22px Arial";
    var x_position = 30;
    for(var i = 0; i < tab2.length; i++){
        ctx.fillStyle = "rgba(0,0,"+ tab2[i] +",1)";
        ctx.fillRect(x_position, 400-tab2[i],ColumnWidth,tab2[i]);
        ctx.fillStyle = "rgba(255,255,255,1)";
        //ctx.fillText(tablica[i],x_position,400);
        ctx.fillStyle = "rgba(255,255,255,1)";
        x_position+=40;

    }

    ctx2.save();
    ctx2.clearRect(0,0,960,500);
    tab3 = [];
    for (var j = 0; j < 23; j++){
        tab3.push(getRandomInt(0,340));
    }

    ctx2.clearRect(0,0,960,500);
    ctx2.fillStyle = "rgba(255,255,255,1)";
    ctx2.font="22px Arial";
    var x_position = 30;
    for(var i = 0; i < tab2.length; i++){
        ctx2.fillStyle = "rgba(0,0,"+ tab3[i] +",1)";
        ctx2.fillRect(x_position, 400-tab3[i],ColumnWidth,tab3[i]);
        ctx2.fillStyle = "rgba(255,255,255,1)";
        //ctx2.fillText(tablica[i],x_position,400);
        ctx2.fillStyle = "rgba(255,255,255,1)";
        x_position+=40;

    }

    waitAnim = setTimeout(waitAnimation,200);

}

function animationLoop() {
    if(finish1 && finish2){
        return true;

    }else{
        algorithm.Update();
        algorithm2.Update();
        loopAnim = setTimeout(animationLoop,200);
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(arr,i,j)
{

    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}
