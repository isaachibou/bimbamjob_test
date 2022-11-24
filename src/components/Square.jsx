const Square = (props) =>  {
  return (
    <div id={props.id} className="square">
      {props.child}
    </div>
  );
}
export default Square