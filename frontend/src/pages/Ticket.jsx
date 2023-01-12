import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {getTicket, reset, closeTicket} from "../features/tickets/ticketSlice";
import {toast} from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const Ticket = () => {
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.ticket);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {ticketId} = useParams();

    useEffect(() => {
        if(isError){
            toast.error(message);
        }

        dispatch(getTicket(ticketId));
    }, [dispatch, ticketId, isError, message])

    //Close Ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success("Ticket closed");
        navigate("/tickets");
    }

    if(isLoading) return <Spinner />;

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
            </header>

            {ticket.status !== "closed" && (
                <button onClick={onTicketClose} className="btn btn-block btn-danger" >
                    Close Ticket
                </button>
            )}
        </div>
    );
};

export default Ticket;
