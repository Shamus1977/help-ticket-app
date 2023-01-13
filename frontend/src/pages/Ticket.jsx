import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import {getTicket, closeTicket} from "../features/tickets/ticketSlice";
import {getNotes, createNote, reset as notesReset} from "../features/notes/notesSlice";
import {toast} from "react-toastify";
import Modal from "react-modal";
import NoteItem from '../components/NoteItem';
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const customModalStyles = {
    content : {
        width: "600px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%,-50%)",
        position:"relative",
    }
};

Modal.setAppElement("#root");

const Ticket = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.ticket);
    const {notes, isLoading: notesIsLoading} = useSelector((state) => state.note);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {ticketId} = useParams();

    useEffect(() => {
        if(isError){
            toast.error(message);
        }

        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
    }, [dispatch, ticketId, isError, message])

    //Close Ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success("Ticket closed");
        navigate("/tickets");
    }

    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({noteText, ticketId}));
        setNoteText("");
        closeModal();
    }

    //Open/Close modal
    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    if(isLoading || notesIsLoading) return <Spinner />;

    if(isError) return <h3>Something Went Wrong</h3>
    return (
        <div className='ticket-page'>
            <header className='ticket-header' >
                <BackButton url="/tickets"/>
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`} >
                        {ticket.status}
                    </span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className='ticket-desc' >
                    <h3>Description of the Issue:</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {ticket.status !== "closed" && (
                <button onClick={openModal} className='btn' ><FaPlus /> Add Note</button>
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                style={customModalStyles} contentLabel="Add Note">
                    <h2>Add Note</h2>
                    <button className='btn-close' onClick={closeModal} >X</button>
                    <form onSubmit={onNoteSubmit} >
                        <div className='form-group' >
                            <textarea 
                                name="noteText" id="noteText" value={noteText} 
                                className="form-control" placeholder='Note Text'
                                onChange={(e) => setNoteText(e.target.value)}
                            ></textarea>
                        </div>
                        <div className='form-group' >
                            <button className='btn' >Submit</button>
                        </div>
                    </form>
                </Modal>

            {notes.map((note) => {
                return <NoteItem key={note._id} note={note} />
            })}

            {ticket.status !== "closed" && (
                <button onClick={onTicketClose} className="btn btn-block btn-danger" >
                    Close Ticket
                </button>
            )}
        </div>
    );
};

export default Ticket;
