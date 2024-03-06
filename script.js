const onDomContentLoaded = function () {
  const radioButtonPersonal = document.querySelector(
    '.form__check-category-personal'
  )
  const radioButtonBusiness = document.querySelector(
    '.form__check-category-business'
  )

  const businessButtonClicked = () => {
    radioButtonBusiness.classList.add('businessActive')
    radioButtonPersonal.classList.remove('personalActive')
  }
  radioButtonBusiness.addEventListener('click', businessButtonClicked)

  const personalButtonClicked = () => {
    radioButtonPersonal.classList.add('personalActive')
    radioButtonBusiness.classList.remove('businessActive')
  }
  radioButtonPersonal.addEventListener('click', personalButtonClicked)
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded)
