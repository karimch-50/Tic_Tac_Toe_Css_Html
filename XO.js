const X_Class='x';
const O_Class='o';
let circleTurne;
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const board = document.getElementById('board');
const cellElements = document.querySelectorAll('[data-cell]');
const Winning_Message_Text = document.querySelector('[winning-message-text]');
const Winning_Message_Element = document.getElementById('winning-message');
const RestartButton = document.getElementById('Restart');

RestartButton.addEventListener('click',StartGame);

StartGame();

function StartGame(){
    circleTurne=false;
    cellElements.forEach(cell => {
        cell.classList.remove(O_Class);
        cell.classList.remove(X_Class);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once : true });
    })
    SetBoardHoverClass();
    Winning_Message_Element.classList.remove('show');
}

function handleClick(e){
    const cell =e.target;
    const currentClass = circleTurne ? O_Class : X_Class;
    //PlaceMark
    PlaceMark(cell,currentClass);
    //Check For Win 
    if(checkWin(currentClass))
    {
        EndGame(false);
    }
    //Check For Draw
    else if(isDraw())
    {
        EndGame(true);
    }
    else
    {
        //Switch Turns
        SwapTurns();
        //
        SetBoardHoverClass();
    }
}

function PlaceMark(cell,currentClass)
{
    cell.classList.add(currentClass);
}

function SwapTurns()
{
    circleTurne=!circleTurne;
}

function SetBoardHoverClass()
{
    board.classList.remove(X_Class);
    board.classList.remove(O_Class);
    if(circleTurne)
        board.classList.add(O_Class);
    else 
        board.classList.add(X_Class);
}

function checkWin(currentClass)
{
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(Index=>{
            return cellElements[Index].classList.contains(currentClass);
        });
    });
}

function EndGame(draw)
{
    if(draw)
    {
        Winning_Message_Text.innerText='Draw!';
        Winning_Message_Element.classList.add('show');
    }
    else
    {
        Winning_Message_Text.innerText=`${circleTurne ? "O's" : "X's"} Wins!`;
        Winning_Message_Element.classList.add('show');
    }
}

function isDraw() 
{
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_Class) || cell.classList.contains(O_Class);
    });
}