import React, { Component, Fragment } from 'react';
import Form, { Group, Check } from 'react-bootstrap/Form';


class Declaration extends Component {

  state = {
    qa_conditions: '',
    efb_evidence: '',
    afb_evidence: '',
    otc_treatment: '',
    otc_treatment_type: '',
    otc_treatment_number: '',
    chemical_exposure: '',
    chemical_exposure_detail: '',
    gmo_exposure: '',
    gmo_exposure_detail: '',
    medical_grade_exposure: '',
    medical_grade_exposure_detail: '',
    supplemental_feeding: '',
    supplemental_feeding_detail: ''
  }

  handleFieldChange = ({ target }) => {
    this.setState({ [target.id]: target.value }, () => {
      if(this.isReady()){
        this.props.updateDeclaration(this.state);
      }
    });
  }

  handleCheckBox = ({ target }) => {
    const value = target.value === 'true';

    this.setState({ [target.id]: value }, () => {
      if(this.isReady()){
        this.props.updateDeclaration(this.state);
      }
    });
  }

  // handleSubmit = async event => {
  //   event.preventDefault();
  //   const docketId = this.props.match.params.id;
  //   //await this.props.createDeclarationOnLot(docketId, this.state);
  //   window.location = `/dockets/${docketId}`;
  // }

  isReady = () => {
    // if (this.state.otcTreatment === true
    //   && (this.state.otcTreatmentType !== '' ||
    //     this.state.otcTreatmentNumber !== '')) {
    //   return false;
    // }

    if (this.state.chemical_exposure === true &&
      this.state.chemical_exposure_detail === '') {
      return false;
    }

    if (this.state.gmo_exposure === true &&
      this.state.gmo_exposure_detail === '') {
      return false;
    }

    if (this.state.medical_grade_exposure === true &&
      this.state.medical_grade_exposure_detail === '') {
      return false;
    }

    if (this.state.supplemental_feeding === true &&
      this.state.supplemental_feeding_detail === '') {
      return false;
    }

    return this.state.qa_conditions === true &&
      this.state.efb_evidence !== '' &&
      this.state.afb_evidence !== '' &&
      this.state.otc_treatment !== '' &&
      this.state.chemical_exposure !== '' &&
      this.state.gmo_exposure !== '' &&
      this.state.medical_grade_exposure !== '' &&
      this.state.supplemental_feeding !== '';
  }

  render() {
    return <Fragment>

      <h4>Declaration</h4>

      <Form>
        <div className="row">
          <div className="col-sm-8">
            The honeys detailed above have been produced under
            my supervision and according to the Quality Assurance conditions of Capilano
            (as detailed below):

            <Group controlId="qa_conditions">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="qa_conditions"
                    name="qa_conditions"
                    label="Yes"
                    value={true}
                    checked={this.state.qa_conditions}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="qa_conditions"
                    name="qa_conditions"
                    label="No"
                    value={false}
                    checked={this.state.qa_conditions === false}
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
                    id="efb_evidence"
                    name="efb_evidence"
                    label="EFB - Yes"
                    value={true}
                    checked={this.state.efb_evidence}
                    onChange={this.handleCheckBox}
                  />

                  <Check
                    type="radio"
                    id="efb_evidence"
                    name="efb_evidence"
                    label="EFB - No"
                    value={false}
                    checked={this.state.efb_evidence === false}
                    onChange={this.handleCheckBox}
                  />
                </div>


                <div className="col">
                  <Check
                    type="radio"
                    id="afb_evidence"
                    name="formHorizontalRadios"
                    label="AFB - Yes"
                    value={true}
                    checked={this.state.afb_evidence}
                    onChange={this.handleCheckBox}
                  />

                  <Check
                    type="radio"
                    id="afb_evidence"
                    name="formHorizontalRadios"
                    label="AFB - No"
                    value={false}
                    checked={this.state.afb_evidence === false}
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
            <Group controlId="otc_treatment">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="otc_treatment"
                    name="otc_treatment"
                    label="Yes"
                    value={true}
                    checked={this.state.otc_treatment}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="otc_treatment"
                    name="otc_treatment"
                    label="No"
                    value={false}
                    checked={this.state.otc_treatment === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.otc_treatment && <Fragment>
                <small>Treatment type</small>
                <div className="row">
                  <div className="col">
                    <Check
                      type="radio"
                      id="otc_treatment_type"
                      name="otc_treatment_type"
                      label="Blanket Treatment"
                      value="Blanket"
                      checked={this.state.otc_treatment_type === "Blanket"}
                      onChange={this.handleFieldChange}
                    />

                  </div>
                  <div className="col">

                    <Check
                      type="radio"
                      id="otc_treatment_type"
                      name="otc_treatment_type"
                      label="Spot Treatment"
                      value="Spot"
                      checked={this.state.otc_treatment_type === "Spot"}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                </div>
                <small>Or a percentage of hives</small>
                <div className="row">
                  <div className="col">
                    <Check
                      type="radio"
                      id="otc_treatment_number"
                      name="otc_treatment_number"
                      label="10%"
                      value="10"
                      checked={this.state.otc_treatment_number === "10"}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className="col">
                    <Check
                      type="radio"
                      id="otc_treatment_number"
                      name="otc_treatment_number"
                      label="20%"
                      value="20"
                      checked={this.state.otc_treatment_number === "20"}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className="col">
                    <Check
                      type="radio"
                      id="otc_treatment_number"
                      name="otc_treatment_number"
                      label="30+%"
                      value="30+"
                      checked={this.state.otc_treatment_number === "30+"}
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
            <Group controlId="chemical_exposure">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="chemical_exposure"
                    name="chemical_exposure"
                    label="Yes"
                    value={true}
                    checked={this.state.chemical_exposure}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="chemical_exposure"
                    name="chemical_exposure"
                    label="No"
                    value={false}
                    checked={this.state.chemical_exposure === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.chemical_exposure && <Fragment>
                <small>Please name the substance or chemical</small>

                <div className="row">
                  <div className="col">
                    <input className="form-control" type="text" id="chemical_exposure_detail" onChange={this.handleFieldChange} value={this.state.chemicalExposureDetail} />
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
            <Group controlId="gmo_exposure">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="gmo_exposure"
                    name="gmo_exposure"
                    label="Yes"
                    value={true}
                    checked={this.state.gmo_exposure}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="gmo_exposure"
                    name="gmo_exposure"
                    label="No"
                    value={false}
                    checked={this.state.gmo_exposure === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.gmo_exposure && <Fragment>
                <small>Please name the crop</small>

                <div className="row">
                  <div className="col">
                    <input className="form-control" type="text" id="gmo_exposure_detail" onChange={this.handleFieldChange} value={this.state.gmoExposureDetail} />
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
            <Group controlId="medical_grade_exposure">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="medical_grade_exposure"
                    name="medical_grade_exposure"
                    label="Yes"
                    value={true}
                    checked={this.state.medical_grade_exposure}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="medical_grade_exposure"
                    name="medical_grade_exposure"
                    label="No"
                    value={false}
                    checked={this.state.medical_grade_exposure === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.medical_grade_exposure && <Fragment>
                <small>Provide details</small>

                <div className="row">
                  <div className="col">
                    <input className="form-control" type="text" id="medical_grade_exposure_detail" onChange={this.handleFieldChange} value={this.state.medical_grade_exposure_detail} />
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
            <Group controlId="supplemental_feeding">
              <div className="row">
                <div className="col">
                  <Check
                    type="radio"
                    id="supplemental_feeding"
                    name="supplemental_feeding"
                    label="Yes"
                    value={true}
                    checked={this.state.supplemental_feeding}
                    onChange={this.handleCheckBox}
                  />
                </div>
                <div className="col">
                  <Check
                    type="radio"
                    id="supplemental_feeding"
                    name="supplemental_feeding"
                    label="No"
                    value={false}
                    checked={this.state.supplemental_feeding === false}
                    onChange={this.handleCheckBox}
                  />
                </div>
              </div>

              {this.state.supplemental_feeding && <Fragment>
                <small>Provide details - eg sugar, pollen, protein supplement</small>

                <div className="row">
                  <div className="col">
                    <input className="form-control" type="text" id="supplemental_feeding_detail" onChange={this.handleFieldChange} value={this.state.supplemental_feeding_detail} />
                  </div>
                </div>
              </Fragment>}

            </Group>

          </div>

        </div>

        {!this.isReady() && <small className="form-text text-muted mb-3">
          You need to complete the declaration to create the container.
        </small>}

      </Form>

    </Fragment>
  }

}

export default Declaration;