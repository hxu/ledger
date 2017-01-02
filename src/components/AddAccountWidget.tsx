import * as React from "react";
import * as _ from "lodash";
import {IAccountMap, ILedgerStore, ICurrencyMap} from "../api/LedgerStore";
import {ICurrency, AccountType, IAccount} from "../api/models";
import {Dispatch, connect} from "react-redux";

interface AddAccountWidgetStoreProps {
    accounts: IAccountMap
    currencies: ICurrencyMap
}

interface AddAccountWidgetState {
    name: string;
    parent: string;
    type: AccountType;
    currency: ICurrency;
}

class _AddAccountWidget extends React.Component<AddAccountWidgetStoreProps, AddAccountWidgetState> {
    constructor(props: AddAccountWidgetStoreProps) {
        super(props);
        this.state = {
            name: '',
            parent: null,
            type: null,
            currency: null
        };
    }

    makeTypeOptions() {
        let options: JSX.Element[] = [<option key="-1">Choose a type</option>];
        // FIXME: relies on an implementation detail of enums in Typescript
        for (let accountType in AccountType) {
            if (!_.isNaN(parseInt(accountType))) {
                options.push(<option key={accountType} value={accountType}>{AccountType[accountType]}</option>)
            }
        }
        return options;
    }

    makeCurrencyOptions() {
        let options: JSX.Element[] = [<option key="-1">Choose a currency</option>];
        _.forEach(this.props.currencies, function(ccy: ICurrency) {
            options.push(<option key={ccy.code} value={ccy.code}>{ccy.code}</option>);
        });
        return options;
    }

    makeParentOptions() {
        let options: JSX.Element[] = [<option key="-1">Choose a parent</option>];
        let validParents: IAccount[] = _.filter(_.values(this.props.accounts), {type: this.state.type});
        _.forEach(validParents, function(acct: IAccount) {
            options.push(<option key={acct.id} value={acct.id}>{acct.name}</option>);
        });
        return options;
    }

    render() {
        return (
            <div>
                <label className="pt-label pt-inline">
                    Account type
                    <div className="pt-select">
                        <select
                            onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                            this.setState(Object.assign({}, this.state, {type: parseInt(e.currentTarget.value)}))
                        }}>
                            {this.makeTypeOptions()}
                        </select>
                    </div>
                </label>

                <label className="pt-label pt-inline">
                    Name
                    <input className="pt-input" type="text"
                           onChange={
                               (e: React.FormEvent<HTMLInputElement>) => {
                                   this.setState(Object.assign({}, this.state, {name: e.currentTarget.value}))
                               }
                           }
                    />
                </label>
                <label className="pt-label pt-inline">
                    Currency
                    <div className="pt-select">
                        <select
                            onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                            this.setState(Object.assign({}, this.state, {currency: e.currentTarget.value}))
                        }}>
                            >
                            {this.makeCurrencyOptions()}
                        </select>
                    </div>
                </label>
                <label className="pt-label pt-inline">
                    Parent account
                    <div className="pt-select">
                        <select
                            onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                            this.setState(Object.assign({}, this.state, {parent: e.currentTarget.value}))
                        }}>
                            {this.makeParentOptions()}
                        </select>
                    </div>
                </label>

                <pre>
                    {JSON.stringify(this.state, null, 2)}
                </pre>

            </div>
        )
    }
}
const mapStateToProps = (state: ILedgerStore): AddAccountWidgetStoreProps => {
    return {
        accounts: state.accounts,
        currencies: state.currencies
    };
};

const mapDispatchToProps =  (dispatch: Dispatch<ILedgerStore>): {} => {
    return {};
};


export const AddAccountWidget: React.ComponentClass<{}> =
    connect(mapStateToProps, mapDispatchToProps)(_AddAccountWidget);