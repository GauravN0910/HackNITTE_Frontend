import './styles.css';
import { Pagination } from '@mantine/core';
import { Bars,UserBar } from '../../Components';
import { HeaderTabs } from "../../Components/header";
import { useState,useEffect } from 'react';
import axios from 'axios';


const LeaderBoard = () => {
    const [activePage, setPage] = useState(1);
    const [ranklead, setranklead] = useState([]);
    const [userlead,setuserLead] = useState({rank : '',userName : '', score : '',dept : ''});
    let data = {"rank" : 1, "userName" : "HARRISH", "score" : 2340, "dept" : "CSE"};

    const getRanks = async() => {
        let res = await axios.get("/api/auth/getAll");
        res = res.data.data; 
        let ranks = res[0];
        let user = res[1];
        ranks.sort();
        ranks.reverse();
        console.log(ranks);
        let userRank = undefined;
        for(let i in ranks){
            if(ranks[i][1] == user){
                userRank = i;
            }
        }
        setuserLead({rank : parseInt(userRank)+1,userName : ranks[userRank][1], score : ranks[userRank][0],dept : ranks[userRank][2]});
        let temp = [];
        for(let i in ranks){
            temp.push({rank : parseInt(i)+1,userName : ranks[i][1], score : ranks[i][0],dept : ranks[i][2]})
        };
        setranklead(temp);
    }

    useEffect(() => {
        getRanks();
    })

    return (
        <>
        <HeaderTabs />  
        <h1>Overall LeaderBoard</h1>
            <div className="bg-animation">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                <div id="stars4"></div>
            </div>
            <div className="container">
            <div className='leaderboard'>
                <Bars data = {{rank : 'RANK',userName : 'NAME', score : 'RATING',dept : 'ROLLNO'}} />
                <UserBar userRankDetails={userlead} />
                {ranklead.map((data) => (
                    <Bars data = {data} />
                ))} 
                

            </div>
            </div>
            <div className='pageflex'>
            <Pagination value={activePage} className='page' onChange={setPage} styles={(theme) => ({
                control: {
                    '&[data-active]': {
                        backgroundImage: theme.fn.gradient({ from: 'indigo', to: 'cyan' }),
                    },
                    '&&:hover': {
                        backgroundColor : '#EFEFEF22',
                    },
                    backgroundColor : "#EFEFEF44",
                    border : 'none',
                    color : 'white'
                },
                dots : {
                    backgroundColor : "#EFEFEF44",
                    border : 'none',
                    color : 'white'
                },
        
      })} total={10} />;
            </div>
            
        </>
       
    )

}

export default LeaderBoard;