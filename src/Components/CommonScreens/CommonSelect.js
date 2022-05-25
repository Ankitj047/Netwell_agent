import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import customStyle from '../../Assets/CSS/stylesheet'
import Select from "@material-ui/core/Select";

class CommonSelect extends Component{
    constructor(props) {
        super(props);
    }



    render() {
        const { classes } = this.props.parentprops;
        return (
            <Select
                multiple
                native
                required
                value={this.props.value}
                onChange={(event) => this.props.multiselectAnswerChangeHandler(event, this.props.index)}
                style={customStyle.multiSelect}
                inputProps={{
                    classes: {
                        root: classes.root,
                        select: classes.selectMenu

                    },
                }}
            >
                {this.props.membersList.map(key => (
                    <option key={key.id} value={key.id}>
                        {key.firstName + ' ' + key.lastName}
                    </option>
                ))}
            </Select>
        );
    }
}

export default CommonSelect;


