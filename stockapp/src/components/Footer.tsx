import '../stylesheets/footer.css'
import Button from "react-bootstrap/Button";

const Footer = ({setStartDate, setEndDate}:{setStartDate:any, setEndDate:any}) => {
  //I have created the current date to make it impossible to search for a date that s not available
  const current = new Date();
  const createDate = (current:Date):string => {
    let date:string = `${current.getFullYear()}-`;
    if(current.getMonth() + 1 < 10)
      date += `0${current.getMonth()+1}-`;
      else date += `${current.getMonth()+1}-`;
    if(current.getDate() < 10)
      date += `0${current.getDate()}`;
      else date += `${current.getDate()}`;
    return date;
  }
  const date = createDate(current);

  return (
    <div className = "footer">
      <div className = "footer-container">
        <form>
          <div>
            <label>Date from</label>
            <input type="date" name="trip-start" className = "date date__start"
                min="01-01-2010" max = {date} placeholder="MM-DD-YYYY"
                onChange = {(event) => setStartDate(event.target.value)}
                />
          </div>
          
          <div>
            <label style = {{marginRight: "2vw"}}>To</label>
            <input type="date" name="trip-end" className = "date date__end"
                min="01-01-2010" max = {date} placeholder = "MM-DD-YYYY"
                onChange = {(event) => setEndDate(event.target.value)}/>
          </div>
        </form>
        <Button 
              //onClick = {handleClick}
              className = "btn btn-secondary btn-filter">Filter
          </Button>
      </div>
    </div>
  )
}

export default Footer