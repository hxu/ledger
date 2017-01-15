import * as React from "react";
import * as _ from "lodash";
import {ISplitMap, ILedgerStore} from "../api/ILedgerStore";
import {Dispatch, connect} from "react-redux";

interface SplitListOwnProps {
    splits: ISplitMap
}

interface SplitListStoreProps {
}

interface SplitListOwnState {
}

interface SplitListDispatch {
}

const mapStateToProps = (state: ILedgerStore): SplitListStoreProps => {
    return {
    };
};

const mapDispatchToProps =  (dispatch: Dispatch<ILedgerStore>): SplitListDispatch => {
    return {
    }
};

type SplitListComponentProps = SplitListOwnProps & SplitListStoreProps & SplitListDispatch;

class SplitListComponent extends React.Component<SplitListComponentProps, SplitListOwnState> {
    constructor(props: SplitListComponentProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Table numRows={20}>
                </Table>
            </div>
        )
    }
}


export const SplitList: React.ComponentClass<SplitListOwnProps> =
    connect<SplitListStoreProps, SplitListDispatch, SplitListOwnProps>(mapStateToProps, mapDispatchToProps)(SplitListComponent);
