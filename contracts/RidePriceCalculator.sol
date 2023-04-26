
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RidePriceCalculator {
    int256 private constant SCALE = 1e6;
    int256 private constant FARE_PER_METER = 20 * SCALE / 1000; // Rs 15 per km converted to Rs per meter
    int256 private constant FARE_PER_MINUTE = 75 * SCALE / 100; // Rs 0.75 per min converted to fixed-point
    int256 private constant SECONDS_PER_HOUR = 3600;

    function calculateFare(int256 distance, int256 speed) public pure returns (int256) {
        // int256 time = div(distance, mul(speed, 1000)); // time in hours

        // int256 fare = mul(distance, FARE_PER_METER) + mul(mul(time, SECONDS_PER_HOUR), FARE_PER_MINUTE);

        // return uint256(div(fare, SCALE));

        //calculate total fare price using disatance and speed
        int256 time = (distance / speed ); // time in hours
        int256 fare = (distance * 20) + (time * 75)/100;
        return fare;

    }

    // // Fixed-point multiplication
    // function mul(int256 a, int256 b) internal pure returns (int256) {
    //     return (a * b + (SCALE / 2)) / SCALE;
    // }

    // // Fixed-point division
    // function div(int256 a, int256 b) internal pure returns (int256) {
    //     return (a * SCALE + (b / 2)) / b;
    // }
}