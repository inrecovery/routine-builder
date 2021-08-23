import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types'

// UI
import { makeStyles } from '@material-ui/core/styles';
import { FONT_COLOR_SECONDARY, COLOR_LINK } from '../../styles/dark';
import { Button } from '@material-ui/core';

// Components
import MemberAvatar from '../Member/MemberAvatar';

// Data
import { staffData } from '../../data';
import { RoutineContext } from '../../context/RoutineContext';

const useStyles = makeStyles({
    filters: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '0 15px 15px 15px',
        borderRadius: 8,
        color: FONT_COLOR_SECONDARY,
        fontSize: '1.1rem',
        fontWeight: 600,
        fontFamily: 'Helvetica, sans-serif',
        "& Button": {
            marginLeft: 10,
            fontFamily: 'Helvetica, sans-serif',
            textTransform: 'none',
            fontSize: '0.9rem',
            fontWeight: 800,
            color: COLOR_LINK,
        },
    },
    avatar: {
        marginRight: 10,
    },  
});

const Filters = ({setup}) => {
    
    const { setSelectedStaff, setSelectedActivity } = useContext(RoutineContext);
    const classes = useStyles();
 
    const isRoutine = setup === 'routine';
    const isTransport = setup === 'transport';
    const displayFilters = isTransport || isRoutine;
    
    const handleStaffFilter = (id) => {
        setSelectedStaff(prevState => id);
        setSelectedActivity(prevState => null);
    }

    const handleActivityFilter = (type) => {
        setSelectedActivity(prevState => type);
        setSelectedStaff(prevState => null);
    }

    const StaffPicker = ({staff}) => {
        return <Button onClick={() => handleStaffFilter(staff._id)}>
            <div className={classes.avatar}><MemberAvatar {...staff} /></div> 
            {staff.firstName}
        </Button>
    }
    return (
        <Fragment>
            {displayFilters && 
                <div className={classes.filters}>
                {isTransport && 
                <Fragment>
                    Filter by Staff
                    {staffData.map(staffMember => <StaffPicker key={staffMember._id} staff={staffMember} />)}
                    <Button onClick={() => handleStaffFilter(null)}>All</Button>
                </Fragment>
                }
                {isRoutine && 
                <Fragment>
                    Filter by Type
                    <Button onClick={() => handleActivityFilter('call')}>Call</Button>
                    <Button onClick={() => handleActivityFilter('recovery')}>Recovery</Button>
                    <Button onClick={() => handleActivityFilter('personal')}>Personal</Button>
                    <Button onClick={() => handleActivityFilter(null)}>All</Button>
                </Fragment>
                }
                </div>
            }
        </Fragment>
    )
}

Filters.propTypes = {
    setup: PropTypes.string.isRequired,
}

export default Filters
