import React, {useState, useEffect, useCallback} from 'react';
import ProfileModal from './ProfileModal';
import Modal from "@netojose/react-modal";

// image
import logo from '../images/logo.svg';

const Profiles=() => {
  const [data, setData]=useState({});
  const [filteredData, setFilteredData]=useState(null);
  const [gender, setGender]=useState("");
  const [modal, setModal]=useState(false);
  const [isOpen, setIsOpen]=useState(false);
  const [visible, setVisible]=useState(45);
  const openModal=useCallback(() => setIsOpen(true), []);
  const closeModal=useCallback(() => setIsOpen(false), []);
  const card=document.querySelectorAll('.profile__card');
  const cardNum=card.length;

  const PersonCard=({results}) => (
    <div className="profile__card" onClick={e => modalOpen(e)}>
      <img src={results.picture.medium} alt='profile'></img>
    </div>
  );

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=225`)
      .then((response) => response.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (!data.results) {
      return;
    }

    if (!gender) {
      setFilteredData(null);
      return;
    }

    const searchResults=data.results.filter((e) => e.gender===gender);
    setFilteredData(searchResults);
  }, [gender]);

  const loadMore=() => {
    setVisible(visible+45);
  };

  const modalOpen = () => {
    setModal(true);
  }

  const modalClose = () => {
    setModal(false)
  }

  if (data.results) {
    return (
      <>
        <header className='header'>
          <div className='header__top'>
            <div className='container'>
              <div className="logo"><img src={logo} alt="Logo" /></div>
                <button className='btn btn--primary btn-generate' onClick={loadMore}>
                  Generate new users
                </button>
            </div>
          </div>
          <div className='header__bottom'>
            <div className='container'>
              <div className="header__left">
                {cardNum} new faces
              </div>
              <div className='header__right'>
                <p>Show :</p>
                <button className='btn btn--curved btn-all' value="" onClick={(e) => setGender(e.target.value)}>All</button>
                <button className='btn btn--curved btn-gents' value="male" onClick={(e) => setGender(e.target.value)}>Gents</button>
                <button className='btn btn--curved btn-ladies' value="female" onClick={(e) => setGender(e.target.value)}>Ladies</button>
              </div>
            </div>
          </div>
        </header>

        <div className='container'>
          <section className='profile'>
            {filteredData
              ? filteredData.map((results, index) => <PersonCard key={index} results={results} />)
              :data.results.slice(0, visible).map((results, index) => <PersonCard key={index} results={results} />)}
          </section>

          <input type="button" value="Open modal" onClick={openModal} />
          <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <p>This is the modal content</p>
            <input type="button" value="Close modal" onClick={closeModal} />
          </Modal>
        </div>
      </>
    );
  } else {
    return <div>loading</div>;
  }
};

export default Profiles;