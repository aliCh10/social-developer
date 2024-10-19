// PostCard.jsx
import React from 'react';
import Image from 'next/image';
import { MoreHorizontal, Bookmark, AlertCircle, AlertOctagon, Lock, ThumbsUp, Heart, MessageCircle, Share2 } from 'react-feather';

const PostCard = () => {
  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
      <div className="card-body p-0 d-flex">
        <figure className="avatar me-3">
          <Image src="/images/user-8.png" alt="User" width={45} height={45} className="shadow-sm rounded-circle" />
        </figure>
        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
          Anthony Daugloi <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hours ago</span>
        </h4>
        <a href="#" className="ms-auto" id="dropdownMenu5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <MoreHorizontal className="text-grey-900 btn-round-md bg-greylight font-xss" />
        </a>
        <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg" aria-labelledby="dropdownMenu5">
          <div className="card-body p-0 d-flex">
            <Bookmark className="text-grey-500 me-3 font-lg" />
            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Save Link
              <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
            </h4>
          </div>
          <div className="card-body p-0 d-flex mt-2">
            <AlertCircle className="text-grey-500 me-3 font-lg" />
            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide Post
              <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
            </h4>
          </div>
          <div className="card-body p-0 d-flex mt-2">
            <AlertOctagon className="text-grey-500 me-3 font-lg" />
            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide all from Group
              <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
            </h4>
          </div>
          <div className="card-body p-0 d-flex mt-2">
            <Lock className="text-grey-500 me-3 font-lg" />
            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Unfollow Group
              <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
            </h4>
          </div>
        </div>
      </div>
      <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
        <a href="#" className="video-btn">
          <video autoPlay loop className="float-right w-100">
            <source src="/images/v-2.mp4" type="video/mp4" />
          </video>
        </a>
      </div>
      <div className="card-body p-0 me-lg-5">
        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non,
          feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus
          <a href="#" className="fw-600 text-primary ms-2">See more</a>
        </p>
      </div>
      <div className="card-body d-flex p-0">
        <a href="#" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-3">
          <ThumbsUp className="text-white bg-primary-gradiant me-1 btn-round-xs font-xss" />
          <Heart className="text-white bg-red-gradiant me-2 btn-round-xs font-xss" />2.8K Like
        </a>
        <a href="#" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
          <MessageCircle className="text-dark text-grey-900 btn-round-sm font-lg" />22 Comment
        </a>
        <a href="#" className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
          <Share2 className="text-grey-900 text-dark btn-round-sm font-lg" /><span className="d-none-xs">Share</span>
        </a>
      </div>
    </div>
  );
};

export default PostCard;
