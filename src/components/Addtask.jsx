import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { addprojects } from '../service/allAPI';
import { toast } from 'react-toastify';


function Addtask() {
    const [show, setShow] = useState(false);
    const[prodata,setprodata]=useState({projname:'',projmanager:'',teammembers:'',startdate:'',enddate:'',budget:''})
    console.log(prodata);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

const addingprocess=async()=>{
  
    
    try {

      const payload = {
        projname: prodata.projname,
        projmanager: prodata.projmanager,
        teammembers: prodata.teammembers
          .split(',')
          .map(name => name.trim()), 
        startdate: new Date(prodata.startdate),
        enddate: new Date(prodata.enddate),
        budget: Number(prodata.budget)
      };
      const out= await addprojects(payload)
      console.log(out);
      if (out.status==200) {
        setprodata({projname:'',projmanager:'',teammembers:'',startdate:'',enddate:'',budget:''})
        toast.success(out.data.message)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  
}

  return (
<>
<div><button onClick={handleShow} className='btn btn-dark m-4'>Create Task</button></div>  
<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center'>
     <div>
     <div><input value={prodata.projname} onChange={e=>setprodata({...prodata,projname:e.target.value})} type="text"  className='mb-3' placeholder='Project Name'/></div>          
      <div><input  value={prodata.projmanager} onChange={e=>setprodata({...prodata,projmanager:e.target.value})}  type="text" className='mb-3' placeholder='Manager'/></div>  
      <div><input value={prodata.teammembers} onChange={e=>setprodata({...prodata,teammembers:e.target.value})} type="text" className='mb-3' placeholder='Team Members'/></div>          
      <div><input value={prodata.startdate} onChange={e=>setprodata({...prodata,startdate:e.target.value})} type="date" className='mb-3' placeholder='Stating Date'/></div>          
      <div><input value={prodata.enddate} onChange={e=>setprodata({...prodata,enddate:e.target.value})} type="date" className='mb-3' placeholder='Ending Date'/></div>          
      <div><input value={prodata.budget} onChange={e=>setprodata({...prodata,budget:e.target.value})} type="text"  className='mb-3' placeholder='Budget'/></div>         
        </div>     

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={addingprocess} variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

</>
)
}

export default Addtask