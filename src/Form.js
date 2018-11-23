import React, { Component } from 'react';

export default class Form extends Component {
    render() {
        return (
            <div id="form">
                <h2>Feedback Form</h2>
                <p>Answer the following questions about your voting experience</p>
                <p>Survey Scale: 1=Very Poor, 5=Very Good</p>
                <table>
                    <tbody>
                        <tr>
                            <td>Indicate the election type</td>
                            <td>
                            <label htmlFor="primary">Primary</label>
                            <input type="radio" name="election-type" id="primary" value="primary"/>
                            <label htmlFor="general">General</label>
                            <input type="radio" name="election-type" id="general" value="general"/>
                            <label htmlFor="local">Local</label>
                            <input type="radio" name="election-type" id="local" value="local"/>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>How satisfied are you with your overall experience?</td>
                            <td>
                                <label htmlFor="q1-very-poor">1</label>
                                <input type="radio" name="overall-satisfaction" id="q1-very-poor" value="very-poor"/>
                                <label htmlFor="q1-poor">2</label>
                                <input type="radio" name="overall-satisfaction" id="q1-poor" value="poor"/>
                                <label htmlFor="q1-fair">3</label>
                                <input type="radio" name="overall-satisfaction" id="q1-fair" value="fair"/>
                                <label htmlFor="q1-good">4</label>
                                <input type="radio" name="overall-satisfaction" id="q1-good" value="good"/>
                                <label htmlFor="q1-very-good">5</label>
                                <input type="radio" name="overall-satisfaction" id="q1-very-good" value="very-good"/>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>If you voted at a poll, how would you rate your wait time?</td>
                            <td>
                                <label htmlFor="q2-very-poor">1</label>
                                <input type="radio" name="wait-time" id="q2-very-poor" value="very-poor"/>
                                <label htmlFor="q2-poor">2</label>
                                <input type="radio" name="wait-time" id="q2-poor" value="poor"/>
                                <label htmlFor="q2-fair">3</label>
                                <input type="radio" name="wait-time" id="q2-fair" value="fair"/>
                                <label htmlFor="q2-good">4</label>
                                <input type="radio" name="wait-time" id="q2-good" value="good"/>
                                <label htmlFor="q2-very-good">5</label>
                                <input type="radio" name="wait-time" id="q2-very-good" value="very-good"/>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>How satisfied are you with the voter registration process?</td>
                            <td>
                                <label htmlFor="q3-very-poor">1</label>
                                <input type="radio" name="registration-satisfaction" id="q3-very-poor" value="very-poor"/>
                                <label htmlFor="q3-poor">2</label>
                                <input type="radio" name="registration-satisfaction" id="q3-poor" value="poor"/>
                                <label htmlFor="q3-fair">3</label>
                                <input type="radio" name="registration-satisfaction" id="q3-fair" value="fair"/>
                                <label htmlFor="q3-good">4</label>
                                <input type="radio" name="registration-satisfaction" id="q3-good" value="good"/>
                                <label htmlFor="q3-very-good">5</label>
                                <input type="radio" name="registration-satisfaction" id="q3-very-good" value="very-good"/>
                            </td>
                        </tr>    
                    </tbody>
                    <tbody>
                        <tr>
                            <td>How satisfied are you with how your polling location addressed any concerns?</td>
                            <td>
                                <label htmlFor="q4-very-poor">1</label>
                                <input type="radio" name="polling-satisfaction" id="q4-very-poor" value="very-poor"/>
                                <label htmlFor="q4-poor">2</label>
                                <input type="radio" name="polling-satisfaction" id="q4-poor" value="poor"/>
                                <label htmlFor="q4-fair">3</label>
                                <input type="radio" name="polling-satisfaction" id="q4-fair" value="fair"/>
                                <label htmlFor="q4-good">4</label>
                                <input type="radio" name="polling-satisfaction" id="q4-good" value="good"/>
                                <label htmlFor="q4-very-good">5</label>
                                <input type="radio" name="polling-satisfaction" id="q4-very-good" value="very-good"/>
                            </td>
                        </tr>  
                    </tbody>
                    <tbody>
                        <tr>
                            <td>How satisfied are you with the voting timeframe?</td>
                            <td>
                                <label htmlFor="q5-very-poor">1</label>
                                <input type="radio" name="vote-timeframe" id="q5-very-poor" value="very-poor"/>
                                <label htmlFor="q5-poor">2</label>
                                <input type="radio" name="vote-timeframe" id="q5-poor" value="poor"/>
                                <label htmlFor="q5-fair">3</label>
                                <input type="radio" name="vote-timeframe" id="q5-fair" value="fair"/>
                                <label htmlFor="q5-good">4</label>
                                <input type="radio" name="vote-timeframe" id="q5-good" value="good"/>
                                <label htmlFor="q5-very-good">5</label>
                                <input type="radio" name="vote-timeframe" id="q5-very-good" value="very-good"/>
                            </td>
                        </tr>  
                    </tbody>
                    <tbody>
                        <tr>
                            <td>How satisfied are you with using directly provided resources?</td>
                            <td>
                                <label htmlFor="q6-very-poor">1</label>
                                <input type="radio" name="resources" id="q6-very-poor" value="very-poor"/>
                                <label htmlFor="q6-poor">2</label>
                                <input type="radio" name="resources" id="q6-poor" value="poor"/>
                                <label htmlFor="q6-fair">3</label>
                                <input type="radio" name="resources" id="q6-fair" value="fair"/>
                                <label htmlFor="q6-good">4</label>
                                <input type="radio" name="resources" id="q6-good" value="good"/>
                                <label htmlFor="q6-very-good">5</label>
                                <input type="radio" name="resources" id="q6-very-good" value="very-good"/>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Add additional comments or concerns here:</td>
                            <td>
                                <label className="form-labels" htmlFor="add-comment">Comments</label>
                                <textarea id="add-comment" rows="4" cols="50"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="submit-feedback">
                    <button form="form">Submit</button>
                </div>
            </div>
        );
    }
}