import React from 'react'
import HabitibilityEstimator from '../../components/HabitibilityEstimator/HabitibilityEstimator'
import Header from '../../components/Header/Header'
import HabitabilityEstimator from '../../components/HabitibilityEstimator/HabitibilityEstimator'
export default function HabitabilityAnalyzer({onSelectPlanet, selectedPlanet}) {
  return (
    <main className="page--outer">
        <div className="content--container">
          <Header onSelectPlanet={onSelectPlanet} title={"Estimator Page"}/>
          <HabitabilityEstimator onSelectPlanet={onSelectPlanet}/>
        </div>
    </main>
  )
}
