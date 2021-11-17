import React  from "react";
import { Container, Spinner } from "react-bootstrap";

const Loading=()=>{
    return(
      <>
        <Container>
            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Spinner style={{width:'5rem',height:'5rem'}} animation="border" variant="primary" />
            </div>
        </Container>
    </>
    )
}
export default Loading;