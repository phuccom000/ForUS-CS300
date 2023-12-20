import { instance } from "../../../api/config";
import { useContext } from "react";
import { BoxContext } from "../context";
import './usercontrol.scss';
import { getTimePassed } from "../../../utils/getTimePassed";

async function voteThread(box, setBox, thread_id, vote) {
    const response = await instance.put(`/thread/${thread_id}/${vote}`);
    if (response.status === 200) {
        setBox(
            {
                ...box,
                threads: box.threads.map((thread) => {
                    if (thread._id === thread_id) {
                        let d = response.data.voteStatus - thread.voteStatus;
                        thread.voteStatus = response.data.voteStatus;
                        thread.score += d;
                    }
                    return thread;
                })
            }
        );
    }
}

async function TempCreateThread(box_id) {
    const thread = prompt("Enter thread title and body (seperated by ','):");
    if (thread) {
        let [title, body] = thread.split(",");
        console.log(title, body);
        const response = await instance.post(`/box/${box_id}/thread`, { title: title, body: body });
        if (response.status === 201) {
            window.location.reload();
        }
    }
}


export function BoxDescription({ box }) {
    return (
        <>
            <div className="card-header fw-bold text-white">About Box</div>
            <div className="card-body text-white">{box.description}</div>
        </>
    );
}

export function CreateThreadButton({ box_id }) {
    return (
        <button 
            type="button" 
            class="btn btn-info text-white"
            onClick={() => TempCreateThread(box_id)}>Tạo thread mới</button>
    );    
}

export function HorizontalVoteBar({ thread }) {
    const { box, setBox } = useContext(BoxContext);
    return (
        <div class="row me-0 rounded-4 border">
            <i 
                class={"col border-0 btn btn-upvote bi " + (thread.voteStatus === 1 ? "bi-arrow-up-circle-fill active" : "bi-arrow-up-circle")}
                onClick={() => voteThread(box, setBox, thread._id, 'upvote')}/>
            <div class="col border-start border-end w-75" style={{paddingBlock: '6px 6px'}}>{thread.score}</div>
            <i 
                class={"col border-0 btn btn-downvote bi " + (thread.voteStatus === -1 ? "bi-arrow-down-circle-fill active" : "bi-arrow-down-circle")}
                onClick={() => voteThread(box, setBox, thread._id, 'downvote')}/>
        </div>
    );
}

export function CommentsCounter({ thread }) {
    return (
        <div class="row rounded-4 border align-middle">
            <span class="my-auto">{thread.commentCount + " comments"}</span>
        </div>
    );
}

export function ThreadInformation({ thread }) {
    return (
        <div class="d-flex gap-2">
            <img class="rounded-circle bg-dark my-auto" width={32} height={32}/>
            <div class="d-flex flex-column justify-content-start">
                <span class="text-white text-start">{thread.author.fullname}</span>
                <small class="text-gray text-start">{getTimePassed(thread.createdAt)}</small>
            </div>
        </div>
    );
}

function PreviousPage({ box, page }) {
    if (page === 1) {
        return (null);
    }
    return (
        <a href={`/box/${box._id}/${page - 1}`} class="rounded-start-2 rounded-end-0 btn btn-light">{'<'}</a>
    );
}

function NextPage({ box, page }) {
    if (page === parseInt(box.pageCount)) {
        return (null);
    }
    return (
        <a href={`/box/${box._id}/${page + 1}`} class="rounded-start-0 rounded-end-2 btn btn-light">{'>'}</a>
    );
}

function NearbyPages({ box, page }) {
    let pageCount = parseInt(box.pageCount);
    if (pageCount < 4) {
        return (
            <>
                {
                    [...Array(pageCount).keys()].map((i) => (
                        <a href={`/box/${box._id}/${i + 1}`} class={"rounded-0 border-start border-end btn btn-light" + (page === i + 1 ? " active" : "")}>{i + 1}</a>
                    ))
                }
            </>
        );
    }
    return (
        <>
            <a href={`/box/${box._id}/${page - 1}`} class="rounded-0 border-start border-end btn btn-light">{[page - 1]}</a>
            <a href={`/box/${box._id}/${page}`} class={"rounded-0 border-start border-end btn btn-light active"}>{page}</a>
            <a href={`/box/${box._id}/${page + 1}`} class={"rounded-0 border-start border-end btn btn-light"}>{page + 1}</a>
        </>
    )
}

export function Pagination ({ box, page }) {
    return (
        <div class="d-flex justify-content-start">
            <PreviousPage box={box} page={page}/>
            <NearbyPages box={box} page={page}/>
            <NextPage box={box} page={page}/>
        </div>
    );
}