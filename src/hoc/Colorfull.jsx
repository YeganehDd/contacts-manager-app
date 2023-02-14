/*
*NOTE : Higher Order Component
*
 */
const Colorfull = (WrappedComponent )=>{
  const colors=[
      "success",
      "warning",
      "danger",
      "info",
      "primary",
      "dark",
      "light"
  ];
   let randomColor = colors[Math.floor(Math.random() * 6 )];
   //we get random number between 0 to 6 .so :
    // colors[0] = "success"
    //colors[1] = "warning"
    //colors[2] = "danger"
    let className =`bg-${randomColor}`;

    return (props)=>{
       return (
           <div className={className}>
               <WrappedComponent{...props} />
           </div>
       )
    }
};

export default Colorfull;

