import React, {useEffect, useState } from 'react';
import {makeStyles,} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    card: {
        width: '150px',
        height: '150px',
        /*margin: '0 78px 0 0',
        padding: '15px 14px 23.1px',*/
        borderRadius: '4px',
        margin: '10px',
        boxShadow: '0 2px 4px 0 #e5e5e5, 0 1px 2px 0 #bdbdbd',
        backgroundColor: '#ffffff'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        color : '#5f2161'
    },
    pos: {
        marginBottom: 12,
    },
    img: {
        height: '60px',
        width : '60px',
        margin : '10px'
    },
    countLbl : {
        fontSize : '14px',
        fontWeight : 'bold',
        color : 'gray'
    },
    countVal : {
        fontSize : '16px',
        fontWeight : 'bold',
        color : 'black'
    }
});

/*export default class AgentCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logoImage : '../../src/Assets/Images/' + this.props.card.logo,
        }
    }

    /!*cardClick = () => {
        this.props.onClick(this.props.linkTo);
    }*!/

    onImgOver = (event) => {
        this.setState({
            logoImage :  '../../src/Assets/Images/' + this.props.card.hoverLogo
        })
    }

    onImgOut = (event) => {
        this.setState({
            logoImage :  '../../src/Assets/Images/' + this.props.card.logo
        })
    }

    render() {
        const classes = useStyles;
        return (
            <Card className={classes.card} onMouseOver={this.onImgOver()} onMouseOut={this.onImgOut()}>
                <CardActionArea>
                    <CardContent>
                        <img className={classes.img} src={this.state.logoImage} />
                        <p className={classes.title}>{this.props.title}</p>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }


}*/

export default function SimpleCard(props) {
    const classes = useStyles();
    const [logoImage, setLogoImage] = useState( props.card.logo);
    const [counts, setCount] = useState(props.countData[props.card.tag]);
    useEffect(() => {
        console.log('======== countData =============');
        console.log(props.countData);
    }, [])

    const cardClick = () => {
        props.openPage(props.linkTo)
    }

    const onImgOver = (event) => {
        setLogoImage( props.card.hoverLogo)
    }
    const onImgOut = (event) => {
        setLogoImage(  props.card.logo)
    }
    const changeCount = (event) =>{
        setCount(props.countData[props.card.tag])
    }
    
    return (
        <div style={{border : '1px solid gray', margin : '20px', display : 'flex', width : '95%'}}>
            <div style={{width : '20%'}}>
                <Card className={classes.card} onMouseOver={onImgOver} onMouseOut={onImgOut} onClick={cardClick}>
                    <CardActionArea>
                        <CardContent>
                            <img className={classes.img} src={require('../../Assets/Images/'  + logoImage)} />
                            <p className={classes.title}>{props.title}</p>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            <div style={{width : '80%'}}>
                <div style={{flexGrow : 1}}>
                <Grid container spacing={1} style={{ fontSize : '12px'}}>
                    <Grid container direction="row" justify="center" alignItems="center" style={{marginTop : '25px'}}>
                        <Grid item xs={4}>
                            <Grid item xs={12} sm={12} className={classes.countLbl}>
                                {
                                    props.card.tag === 'household' ?
                                        <>Total Households <br/> PROSPECTED</>
                                    :
                                    <>Total Employers <br/> PROSPECTED</>
                                }

                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.countVal}>
                                {counts.prospectCount}
                            </Grid>

                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12} sm={12} className={classes.countLbl}>

                                {
                                    props.card.tag === 'household' ?
                                        <>Total Households <br/> ENROLLED</>
                                        :
                                        <>Total Employers <br/> ENROLLED</>
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.countVal}>
                                {counts.enrollCount}
                            </Grid>

                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12} sm={12} className={classes.countLbl}>
                                {
                                    props.card.tag === 'household' ?
                                        <>Total Households <br/> IN PROGRESS</>
                                        :
                                        <>Total Employers <br/> IN PROGRESS</>
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.countVal}>
                                {counts.notEnrollCount}
                            </Grid>

                        </Grid>
                        <Grid item xs={4}>

                            <Grid item xs={12} sm={12} className={classes.countLbl}>
                                Total Monthly Share
                                <br/>
                                PROSPECTED
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.countVal}>
                                ${counts.prospectedAmount}
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>

                            <Grid item xs={12} sm={12} className={classes.countLbl}>
                                Total Monthly Contribution
                                <br/>
                                ENROLLED
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.countVal}>
                                ${counts.enrollAmount}
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid item xs={12} sm={12} className={classes.countLbl}>
                                Total Monthly Share
                                <br/>
                                IN PROGRESS
                            </Grid>
                            <Grid item xs={12} sm={12} className={classes.countVal}>
                                ${counts.notEnrollAmount}
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </div>
            </div>

        </div>
    );
}
