import React, { Component, Fragment } from 'react';
import Octicon, { Verified } from '@githubprimer/octicons-react';
import { connect } from 'react-redux';
import { createDeclarationOnDocket } from '../../redux/actions/actions';
import Form, { Group, Check } from 'react-bootstrap/Form';


class Declaration extends Component {

  state = {
    qaConditions: '',
    efbEvidence: '',
    afbEvidence: '',
    otcTreatment: '',
    otcTreatmentType: '',
    otcTreatmentNumber: '',
    chemicalExposure: '',
    chemicalExposureDetail: '',
    gmoExposure: '',
    gmoExposureDetail: '',
    medicalGradeExposure: '',
    medicalGradeExposureDetail: '',
    supplementalFeeding: '',
    supplementalFeedingDetail: ''
  }

  handleFieldChange = ({ target }) => this.setState({ [target.id]: target.value });

  handleCheckBox = ({ target }) => {
    const value = target.value === 'true';

    this.setState({ [target.id]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const docketId = this.props.match.params.id;
    await this.props.createDeclarationOnDocket(docketId, this.state);
    window.location = `/dockets/${docketId}`;
  }

  isReady = () => {
    // if (this.state.otcTreatment === true
    //   && (this.state.otcTreatmentType !== '' ||
    //     this.state.otcTreatmentNumber !== '')) {
    //   return false;
    // }

    if (this.state.chemicalExposure === true &&
      this.state.chemicalExposureDetail === '') {
      return false;
    }

    if (this.state.gmoExposure === true &&
      this.state.gmoExposureDetail === '') {
      return false;
    }

    if (this.state.medicalGradeExposure === true &&
      this.state.medicalGradeExposureDetail === '') {
      return false;
    }

    if (this.state.supplementalFeeding === true &&
      this.state.supplementalFeedingDetail === '') {
      return false;
    }

    return this.state.qaConditions === true &&
      this.state.efbEvidence !== '' &&
      this.state.afbEvidence !== '' &&
      this.state.otcTreatment !== '' &&
      this.state.chemicalExposure !== '' &&
      this.state.gmoExposure !== '' &&
      this.state.medicalGradeExposure !== '' &&
      this.state.supplementalFeeding !== '';
  }

  render() {
    return <Fragment>

      <h3>Add Declaration</h3>

      <Form>
        <div className="row">
          <div className="col-sm-8">
            The honeys detailed above have been produced under
            my supervision and according to the Quality Assurance conditions of Capilano
            (as detailed below):

            <Group controlId="qaConditions">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="qaConditions"
                    name="qaConditions"
                    label="Yes"
                    value={true}
                    checked={this.state.qaConditions}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="qaConditions"
                    name="qaConditions"
                    label="No"
                    value={false}
                    checked={this.state.qaConditions === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>
            </Group>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <small>Is there evidence of EFB or AFB (P.larvae) in the honey bee colonies supplying these honeys or has a positive AFB culture test been received?</small>
          </div>
          <div className="col-sm-4">
            <Group >
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="efbEvidence"
                    name="efbEvidence"
                    label="EFB - Yes"
                    value={true}
                    checked={this.state.efbEvidence}
                    onChange={this.handleCheckBox}
                  />

                  <Check
                    type="radio"
                    id="efbEvidence"
                    name="efbEvidence"
                    label="EFB - No"
                    value={false}
                    checked={this.state.efbEvidence === false}
                    onChange={this.handleCheckBox}
                  />
                </div>


                <div className="col">
                  <Check
                    type="radio"
                    id="afbEvidence"
                    name="formHorizontalRadios"
                    label="AFB - Yes"
                    value={true}
                    checked={this.state.afbEvidence}
                    onChange={this.handleCheckBox}
                  />

                  <Check
                    type="radio"
                    id="afbEvidence"
                    name="formHorizontalRadios"
                    label="AFB - No"
                    value={false}
                    checked={this.state.afbEvidence === false}
                    onChange={this.handleCheckBox}
                  />

                </div>

              </div>

            </Group>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <small>Have the hives been treated with Oxytetracycline (OTC) antibiotics in the last 6 months?</small>
          </div>
          <div className="col-sm-4">
            <Group controlId="otcTreatment">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="otcTreatment"
                    name="otcTreatment"
                    label="Yes"
                    value={true}
                    checked={this.state.otcTreatment}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="otcTreatment"
                    name="otcTreatment"
                    label="No"
                    value={false}
                    checked={this.state.otcTreatment === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.otcTreatment && <Fragment>
                <small>Treatment type</small>
                <div className="row">
                  <div className="col">
                    <Check
                      type="radio"
                      id="otcTreatmentType"
                      name="otcTreatmentType"
                      label="Blanket Treatment"
                      value="Blanket"
                      checked={this.state.otcTreatmentType === "Blanket"}
                      onChange={this.handleFieldChange}
                    />

                  </div>
                  <div className="col">

                    <Check
                      type="radio"
                      id="otcTreatmentType"
                      name="otcTreatmentType"
                      label="Spot Treatment"
                      value="Spot"
                      checked={this.state.otcTreatmentType === "Spot"}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                </div>
                <small>Or a percentage of hives</small>
                <div className="row">
                  <div className="col">
                    <Check
                      type="radio"
                      id="otcTreatmentNumber"
                      name="otcTreatmentNumber"
                      label="10%"
                      value="10"
                      checked={this.state.otcTreatmentNumber === "10"}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className="col">
                    <Check
                      type="radio"
                      id="otcTreatmentNumber"
                      name="otcTreatmentNumber"
                      label="20%"
                      value="20"
                      checked={this.state.otcTreatmentNumber === "20"}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className="col">
                    <Check
                      type="radio"
                      id="otcTreatmentNumber"
                      name="otcTreatmentNumber"
                      label="30+%"
                      value="30+"
                      checked={this.state.otcTreatmentNumber === "30+"}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                </div>

              </Fragment>}
            </Group>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <small>Have the honeys or containers detailed above been exposed to any chemicals (eg. repellents, phenol, benzaldehyde, pesticides, para-dichlorobenzene, insecticides, miticides, herbicides, small hive beetle controls, fungicides, wax moth controls, other antibiotics)?</small>
          </div>
          <div className="col-sm-4">
            <Group controlId="chemicalExposure">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="chemicalExposure"
                    name="chemicalExposure"
                    label="Yes"
                    value={true}
                    checked={this.state.chemicalExposure}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="chemicalExposure"
                    name="chemicalExposure"
                    label="No"
                    value={false}
                    checked={this.state.chemicalExposure === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.chemicalExposure && <Fragment>
                <small>Please name the substance or chemical</small>

                <div className="row">
                  <div className="col">
                    <input className="form-control" type="text" id="chemicalExposureDetail" onChange={this.handleFieldChange} value={this.state.chemicalExposureDetail} />
                  </div>
                </div>
              </Fragment>}

            </Group>

          </div>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <small>Have the hives been located closer than 5km to a known genetically modified crop?</small>
          </div>
          <div className="col-sm-4">
            <Group controlId="gmoExposure">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="gmoExposure"
                    name="gmoExposure"
                    label="Yes"
                    value={true}
                    checked={this.state.gmoExposure}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="gmoExposure"
                    name="gmoExposure"
                    label="No"
                    value={false}
                    checked={this.state.gmoExposure === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.gmoExposure && <Fragment>
                <small>Please name the crop</small>

                <div className="row">
                  <div className="col">
                    <input className="form-control" type="text" id="gmoExposureDetail" onChange={this.handleFieldChange} value={this.state.gmoExposureDetail} />
                  </div>
                </div>
              </Fragment>}

            </Group>

          </div>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <small>Medical/Active Grade Honey (e.g. Leptospermum, Manuka, Jarrah) Only: Have the hives or honey supplied been exposed to any chemicals or antibiotics (including OTC) in the last 6 months?</small>
          </div>
          <div className="col-sm-4">
            <Group controlId="medicalGradeExposure">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="medicalGradeExposure"
                    name="medicalGradeExposure"
                    label="Yes"
                    value={true}
                    checked={this.state.medicalGradeExposure}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="medicalGradeExposure"
                    name="medicalGradeExposure"
                    label="No"
                    value={false}
                    checked={this.state.medicalGradeExposure === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.medicalGradeExposure && <Fragment>
                <small>Provide details</small>

                <div className="row">
                  <div className="col">
                    <input className="form-control" type="text" id="medicalGradeExposureDetail" onChange={this.handleFieldChange} value={this.state.medicalGradeExposureDetail} />
                  </div>
                </div>
              </Fragment>}

            </Group>

          </div>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <small>Has honey supplied been extracted during a period of supplement feeding?</small>
          </div>

          <div className="col-sm-4">
            <Group controlId="supplementalFeeding">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="supplementalFeeding"
                    name="supplementalFeeding"
                    label="Yes"
                    value={true}
                    checked={this.state.supplementalFeeding}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="supplementalFeeding"
                    name="supplementalFeeding"
                    label="No"
                    value={false}
                    checked={this.state.supplementalFeeding === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.supplementalFeeding && <Fragment>
                <small>Provide details - eg sugar, pollen, protein supplement</small>

                <div className="row">
                  <div className="col">
                    <input className="form-control" type="text" id="supplementalFeedingDetail" onChange={this.handleFieldChange} value={this.state.supplementalFeedingDetail} />
                  </div>
                </div>
              </Fragment>}

            </Group>

          </div>

        </div>

        {!this.isReady() && <small className="form-text text-muted">
          You need to completely the form to submit the declaration.
        </small>}

        <button className="btn btn-success btn-block" onClick={this.handleSubmit} disabled={!this.isReady()}>
          <Octicon icon={Verified} /> Save Declaration
        </button>

      </Form>

    </Fragment>
  }

}
const mapStateToProps = ({ dockets }) => ({ dockets });

export default connect(mapStateToProps, { createDeclarationOnDocket })(Declaration);