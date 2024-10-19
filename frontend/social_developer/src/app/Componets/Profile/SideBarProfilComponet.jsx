import React from 'react'
import { ExternalLink, Eye, Lock, MapPin, Users } from 'react-feather';

function SideBarProfilComponet() {
    return (

        <div>
            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
                <div className="card-body p-3 border-0">
                    <div className="row">
                        <div className="col-3">
                            <div className="chart-container w50 h50">
                                <div className="chart position-relative" data-percent="78" data-bar-color="#a7d212">
                                    <span className="percent fw-700 font-xsss">78%</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 ps-1">
                            <h4 className="font-xsss d-block fw-700 mt-2 mb-0">
                                Advanced Python Sass
                                <span className="float-right mt-2 font-xsssss text-grey-500">87%</span>
                            </h4>
                            <p className="font-xssss fw-600 text-grey-500 lh-26 mb-0">Designer</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-block p-4">
                    <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
                    <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus.
                    </p>
                </div>
                <div className="card-body border-top-xs d-flex">
                    <Lock className="text-grey-500 me-3 font-lg" />
                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">
                        Private
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">What's up, how are you?</span>
                    </h4>
                </div>
                <div className="card-body d-flex pt-0">
                    <Eye className="text-grey-500 me-3 font-lg" />
                    <h4 className="fw-700 text-grey-900 font-xssss mt-0">
                        Visible
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">Anyone can find you</span>
                    </h4>
                </div>
                <div className="card-body d-flex pt-0">
                    <MapPin className="text-grey-500 me-3 font-lg" />
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">Flodia, Austia</h4>
                </div>
                <div className="card-body d-flex pt-0">
                    <Users className="text-grey-500 me-3 font-lg" />
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">General Group</h4>
                </div>
            </div>


            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Photos</h4>
                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                </div>
                <div className="card-body d-block pt-0 pb-2">
                    <div className="row">
                        {[1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div key={index} className={`col-6 mb-2 ${index % 2 === 0 ? 'pe-1' : 'ps-1'}`}>
                                <a href={`/images/e-${item}.jpg`} data-lightbox="roadtrip">
                                    <img src={`/images/e-${item}.jpg`} alt={`image-${item}`} className="img-fluid rounded-3 w-100" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card-body d-block w-100 pt-0">
                    <a href="#" className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl">
                        <ExternalLink className="font-xss me-2" /> More
                    </a>
                </div>
            </div>


            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center p-4">
                    <h4 className="fw-700 mb-0 font-xssss text-grey-900">Event</h4>
                    <a href="#" className="fw-600 ms-auto font-xssss text-primary">See all</a>
                </div>
                {[
                    { date: 'FEB 22', title: 'Meeting with clients' },
                    { date: 'APR 30', title: 'Developer Program' },
                    { date: 'APR 23', title: 'Anniversary Event' },
                ].map((event, index) => (
                    <div key={index} className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                        <div className={`bg-${index === 0 ? 'success' : index === 1 ? 'warning' : 'primary'} me-2 p-3 rounded-xxl`}>
                            <h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
                                <span className="ls-1 d-block font-xsss text-white fw-600">{event.date.split(' ')[0]}</span>
                                {event.date.split(' ')[1]}
                            </h4>
                        </div>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                            {event.title}
                            <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">41 Madison Ave, Floor 24, New York, NY 10010</span>
                        </h4>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default SideBarProfilComponet
