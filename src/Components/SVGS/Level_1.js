import React, { useEffect, useState,useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Svg, {
  G,
  Rect,
  Path,
  Polygon,
  Circle,
  Polyline,
  Text,
  TSpan,
  Line
} from "react-native-svg";
import { initiateProcess } from "../../Functions/initiateProcess";
import { beacons } from '../../data/beacons';
import locate from 'multilateration';
// import { multilaterate } from "../../Functions/multilaterate";


export default function Level_1(props) {
  const [path, setPath] = useState("");
  const [coordinate, setCoordinate] = useState(null);
  const [showSvg, setShowSvg] = useState(false);
  const [showStairsCircle, setShowStairsCircle] = useState(false);
  const [showElevatorCircle, setShowElevatorCircle] = useState(false);
  const [updatedBeacons, setUpdatedBeacons] = useState(beaconDataSet);
  const navigation = useNavigation();
  const [isScanning, setIsScanning] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const isExecutingRef = useRef(isExecuting);

  let { startObject, destinationObject, beaconDataSet } = props;

  useEffect(() => {

    /**
     * BATCH STATE UPDATE
     */

    if (
      startObject !== null &&
      destinationObject !== null &&
      startObject?.id !== null &&
      destinationObject?.id !== null
    ) {
      if (startObject?.number !== destinationObject?.number) {
        if (destinationObject?.number === "2M") {
          setPath(`cinemaMidRight-restRooms2`);
          setShowStairsCircle(true);
        } else {
          setPath(`${startObject?.id}-elevator2`);
          setShowElevatorCircle(true);
        }
      } else {
        setPath(`${startObject?.id}-${destinationObject?.id}`);
      }

      console.log("calculated");
      setShowSvg(true);
    }
  }, [startObject, destinationObject]);

  useEffect(() => {
    isExecutingRef.current = isExecuting;
  }, [isExecuting]);

  useEffect(() => {
    console.log("updatedBeacons useEffect");
    let result = null;
    if (updatedBeacons?.length > 2) {
      result = locate(updatedBeacons);
    } else if (updatedBeacons?.length < 2) {
      result = locate([
        ...updatedBeacons,
        { distance: 0, x: 0, y: 0 },
        { distance: 0, x: 0, y: 0 },
      ]);
      // var deviceLocation = multilaterate(updatedBeacons, updatedBeacons.map(p => p.distance));
    } else if (updatedBeacons?.length === 2) {
      result = locate([...updatedBeacons, { distance: 0, x: 0, y: 0 }]);
    }
    console.log(result, "result");
    setCoordinate(result);
  }, [updatedBeacons]);

  const updateCurrentPosition = async () => {
    console.log("updatePosition Called");
    let connectedDevices = await initiateProcess(false, setIsScanning);
    console.log("initiate Process Completed");
    let array = [];
    beacons?.forEach((beacon) => {
      connectedDevices?.forEach((device) => {
        if (beacon?.location_id === device?.location_id) {
          array.push({ ...beacon, distance: device?.distance });
        }
      });
    });
    setUpdatedBeacons(array);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("set interval");
      setIsExecuting((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isExecutingRef.current) {
      updateCurrentPosition().then(() => {
        console.log("updatePosition completed");
      });
    }
  }, [isExecuting]);

  const handleCirclePress = () => {
    navigation.navigate("MapScreen", {
      startObject:
        destinationObject?.number === "2M"
          ? { number: "2M", id: "stairs2M" }
          : `elevator${destinationObject?.number}`,
      destinationObject: destinationObject,
      beaconDataSet: updatedBeacons,
      showCircle: true,
    });
  };

  return (
    showSvg && (
      <Svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 710.45203 440.452"
        {...props}
      >
        <G id="BG">
          <G style={{ opacity: 0.4 }}>
            <G>
              <Rect
                x={238.27393}
                y={18.49707}
                width={2}
                height={25.89747}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={234.46118}
                y={18.49707}
                width={2}
                height={25.89649}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={215.39844}
                y={18.49707}
                width={2}
                height={14.8423}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={211.58374}
                y={18.49707}
                width={2}
                height={14.84131}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={207.77124}
                y={18.49707}
                width={2}
                height={14.83985}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={203.95874}
                y={18.49707}
                width={2}
                height={14.83887}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={230.64868}
                y={18.49707}
                width={2}
                height={25.89503}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={226.83618}
                y={18.49707}
                width={2}
                height={25.89405}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={223.02368}
                y={18.49706}
                width={2}
                height={14.84474}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={219.21094}
                y={18.49707}
                width={2}
                height={14.84376}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={184.896}
                y={18.49707}
                width={2}
                height={27.45703}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={181.0835}
                y={18.49707}
                width={2}
                height={27.45557}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={172.84863}
                y={39.5293}
                width={10.84474}
                height={2}
                transform="translate(137.4806 218.74073) rotate(-89.91607)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.46045}
                y={27.50439}
                width={2}
                height={18.44581}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={200.14624}
                y={18.49707}
                width={2}
                height={14.8379}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={196.3335}
                y={18.49707}
                width={2}
                height={14.83643}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={192.521}
                y={18.49707}
                width={2}
                height={14.83546}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={188.7085}
                y={18.49707}
                width={2}
                height={27.45801}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.13329}
                y={39.43457}
                width={11.02931}
                height={2}
                transform="translate(129.96345 211.02311) rotate(-89.91607)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={161.32153}
                y={39.43384}
                width={11.02785}
                height={2}
                transform="translate(126.15727 207.20988) rotate(-89.91607)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={157.51634}
                y={39.43335}
                width={11.0269}
                height={2.00001}
                transform="translate(122.11898 203.34398) rotate(-89.83214)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={145.74828}
                y={39.43139}
                width={11.02297}
                height={2}
                transform="translate(110.53302 191.61191) rotate(-89.88809)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={153.37742}
                y={39.43261}
                width={11.02543}
                height={2.00001}
                transform="translate(117.9922 199.20362) rotate(-89.83214)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={149.56638}
                y={39.43212}
                width={11.02446}
                height={2.00001}
                transform="translate(114.19233 195.39162) rotate(-89.83214)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={141.93432}
                y={39.43384}
                width={11.02785}
                height={2}
                transform="translate(106.79846 187.82269) rotate(-89.91607)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={138.12913}
                y={39.43335}
                width={11.0269}
                height={2.00001}
                transform="translate(102.78858 183.95685) rotate(-89.83214)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={126.36132}
                y={39.43139}
                width={11.02297}
                height={2}
                transform="translate(91.18392 172.22498) rotate(-89.88809)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={133.99021}
                y={39.43261}
                width={11.02543}
                height={2.00001}
                transform="translate(98.66179 179.81649) rotate(-89.83214)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={130.17918}
                y={39.43212}
                width={11.02446}
                height={2.00001}
                transform="translate(94.86192 176.0045) rotate(-89.83214)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={114.56591}
                y={39.43139}
                width={11.02297}
                height={2}
                transform="translate(79.41155 160.42959) rotate(-89.88809)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={122.1948}
                y={39.43261}
                width={11.02543}
                height={2.00001}
                transform="translate(86.90093 168.02113) rotate(-89.83214)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={120.62935}
                y={37.18651}
                width={6.53328}
                height={2.00002}
                transform="translate(85.10497 161.89459) rotate(-89.72024)"
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G id="target">
              <Rect
                x={119.32324}
                y={124.47217}
                width={17.47169}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={119.32324}
                y={120.65942}
                width={20.19288}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={123.94482}
                y={96.97412}
                width={2}
                height={11.24317}
                transform="translate(22.17558 227.39783) rotate(-89.92037)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={119.32324}
                y={97.78076}
                width={11.24317}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={119.32324}
                y={93.96826}
                width={11.24317}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={119.32324}
                y={90.15576}
                width={11.24317}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={123.94482}
                y={112.22509}
                width={2}
                height={11.24317}
                transform="translate(6.9463 242.64811) rotate(-89.93033)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={123.94482}
                y={108.41259}
                width={2}
                height={11.24317}
                transform="translate(10.75879 238.84024) rotate(-89.93033)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={123.94482}
                y={104.59936}
                width={2}
                height={11.24317}
                transform="translate(14.55576 235.01727) rotate(-89.92286)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={123.94482}
                y={100.78686}
                width={2}
                height={11.24317}
                transform="translate(18.36826 231.2099) rotate(-89.92286)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={119.32324}
                y={71.09448}
                width={11.24317}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={127.49023}
                y={66.20581}
                width={2.00001}
                height={4.15235}
                transform="translate(59.92134 196.61934) rotate(-89.87199)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={119.32324}
                y={86.34326}
                width={11.24317}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={119.32324}
                y={82.53076}
                width={11.24317}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={119.32324}
                y={78.71851}
                width={11.24317}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={119.32324}
                y={74.90698}
                width={11.24317}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G id="welcome">
              <Rect
                x={174.35473}
                y={140.34008}
                width={2.00001}
                height={5.4839}
                transform="translate(31.83597 318.07951) rotate(-89.85716)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={174.30859}
                y={136.57372}
                width={2.00001}
                height={5.39162}
                transform="translate(35.59497 314.22441) rotate(-89.85471)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={116.21166}
                width={2}
                height={7.9883}
                transform="translate(53.47493 293.98798) rotate(-89.89143)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={112.39697}
                width={2}
                height={7.98829}
                transform="translate(57.38525 290.24469) rotate(-89.92295)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={108.58447}
                width={2}
                height={7.98829}
                transform="translate(61.19774 286.43732) rotate(-89.92295)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={104.77197}
                width={2}
                height={7.98829}
                transform="translate(65.01024 282.62995) rotate(-89.92295)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={174.30859}
                y={132.76122}
                width={2.00001}
                height={5.39162}
                transform="translate(39.40746 310.42157) rotate(-89.85471)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={174.30859}
                y={128.94872}
                width={2.00001}
                height={5.39162}
                transform="translate(43.21994 306.61874) rotate(-89.85471)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={174.30859}
                y={148.02489}
                width={2.00001}
                height={5.39162}
                transform="translate(24.14383 325.64654) rotate(-89.85471)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={174.30859}
                y={144.21239}
                width={2.00001}
                height={5.39162}
                transform="translate(27.95632 321.84371) rotate(-89.85471)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={174.30859}
                y={125.13524}
                width={2.00001}
                height={5.39162}
                transform="translate(46.97003 302.76846) rotate(-89.83396)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={120.02441}
                width={2}
                height={7.9883}
                transform="translate(49.65157 297.7859) rotate(-89.88793)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={85.7102}
                width={2}
                height={7.98829}
                transform="translate(84.10388 263.6103) rotate(-89.93346)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={81.8977}
                width={2}
                height={7.98829}
                transform="translate(87.91638 259.80223) rotate(-89.93346)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={100.95922}
                width={2}
                height={7.98829}
                transform="translate(68.81235 278.8159) rotate(-89.91945)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={97.14648}
                width={2}
                height={7.98829}
                transform="translate(72.63572 275.01471) rotate(-89.92295)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={93.33422}
                width={2}
                height={7.98829}
                transform="translate(76.43735 271.20162) rotate(-89.91945)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.01025}
                y={89.5227}
                width={2}
                height={7.98829}
                transform="translate(80.29138 267.41837) rotate(-89.93346)"
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={188.85425}
                y={286.94336}
                width={2}
                height={42.75879}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={185.04175}
                y={286.94336}
                width={2}
                height={42.75781}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.979}
                y={286.93945}
                width={2}
                height={42.75879}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={162.16626}
                y={289.32324}
                width={2}
                height={40.37402}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={158.35376}
                y={290.73437}
                width={2}
                height={38.96289}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={154.54126}
                y={291.93555}
                width={2}
                height={37.76074}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={181.22925}
                y={286.94238}
                width={2}
                height={42.75781}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.41675}
                y={286.94141}
                width={2}
                height={38.44629}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={173.60425}
                y={286.94141}
                width={2}
                height={36.67188}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={169.79175}
                y={286.94043}
                width={2}
                height={42.75879}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={150.72876}
                y={293.43555}
                width={2}
                height={36.25977}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={146.91626}
                y={294.83887}
                width={2}
                height={34.85645}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={143.10376}
                y={296.29102}
                width={2}
                height={33.40332}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={139.28491}
                y={298.84082}
                width={2}
                height={30.86035}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={120.22192}
                y={309.45703}
                width={2}
                height={20.24121}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={116.40942}
                y={304.38769}
                width={2}
                height={25.30957}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={112.59692}
                y={305.04102}
                width={2}
                height={24.65625}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.78442}
                y={305.45996}
                width={2}
                height={24.23633}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={135.47241}
                y={303.98828}
                width={2}
                height={25.71191}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={131.65991}
                y={306.51269}
                width={2}
                height={17.68164}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={127.84741}
                y={305.14941}
                width={2}
                height={24.75391}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={124.03467}
                y={306.22168}
                width={2}
                height={23.47754}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={104.97192}
                y={306.03711}
                width={2}
                height={23.66504}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={101.15942}
                y={292.06445}
                width={2}
                height={37.63086}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={97.34692}
                y={292.33789}
                width={2}
                height={37.35645}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={93.52808}
                y={292.75879}
                width={2}
                height={36.93652}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={89.71558}
                y={293.41211}
                width={2}
                height={36.28223}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={226.97974}
                y={286.94336}
                width={2}
                height={44.28125}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={223.16724}
                y={286.94336}
                width={2}
                height={44.2832}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={204.10449}
                y={286.93945}
                width={2}
                height={44.28418}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={200.29175}
                y={286.93945}
                width={2}
                height={44.28418}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={196.47925}
                y={286.93945}
                width={2}
                height={44.28418}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={192.66675}
                y={286.93945}
                width={2}
                height={44.28418}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={219.35474}
                y={286.94238}
                width={2}
                height={44.2832}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={215.54224}
                y={286.94141}
                width={2}
                height={44.2832}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={211.72974}
                y={286.94141}
                width={2}
                height={44.2832}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={207.91724}
                y={286.94043}
                width={2}
                height={44.2832}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={182.87109}
                y={185.52637}
                width={57.41943}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={184}
                y={189.33887}
                width={56.29053}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={184.72754}
                y={193.15137}
                width={55.56299}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={185.44482}
                y={196.96387}
                width={54.8457}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={175.44238}
                y={170.27588}
                width={64.84814}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.93555}
                y={174.08838}
                width={62.35498}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={180}
                y={177.90088}
                width={60.29053}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={181.45166}
                y={181.71387}
                width={58.83887}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={216.02637}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={219.83887}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={223.65137}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={227.46387}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={178.35889}
                y={200.77637}
                width={61.93164}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={168.96777}
                y={204.58887}
                width={71.32275}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={208.40137}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={212.21387}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={246.52734}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={250.33984}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={254.15234}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={257.96484}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={231.27637}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={235.08887}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={238.90137}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={242.71484}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={261.77734}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={265.58984}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={269.40234}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={281.16602}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={284.97852}
                width={66.81641}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={273.54102}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={165.43408}
                y={277.35352}
                width={74.85645}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={179.31592}
                y={81.07471}
                width={52.86963}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.31592}
                y={84.88721}
                width={52.86963}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.31592}
                y={103.9502}
                width={53.05518}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={194.19336}
                y={107.7627}
                width={38.17773}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={194.19336}
                y={111.5752}
                width={38.17773}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={194.19336}
                y={115.3877}
                width={38.17773}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.31592}
                y={88.69971}
                width={52.86963}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.31592}
                y={92.51221}
                width={50.12354}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.31592}
                y={96.32471}
                width={48.34521}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.31592}
                y={100.13721}
                width={53.05518}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={192.94629}
                y={134.4502}
                width={39.4248}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={192.94629}
                y={138.2627}
                width={42.35938}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.32275}
                y={142.0752}
                width={55.98291}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.32275}
                y={145.88818}
                width={55.98291}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={194.19336}
                y={119.2002}
                width={38.17773}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={192.94629}
                y={123.0127}
                width={39.4248}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={192.94629}
                y={126.8252}
                width={39.4248}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={192.94629}
                y={130.6377}
                width={39.4248}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.32275}
                y={149.70068}
                width={55.98291}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.32275}
                y={153.51318}
                width={55.98291}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={135.66846}
                y={157.32568}
                width={99.63721}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={172.56738}
                y={169.08984}
                width={62.73828}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={139.51904}
                y={161.46436}
                width={95.78662}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={133.85059}
                y={165.27686}
                width={101.45508}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={159.78613}
                y={47.04297}
                width={31.16553}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={159.78613}
                y={50.85547}
                width={31.16553}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={159.78613}
                y={69.91797}
                width={31.16553}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={158.18652}
                y={54.66797}
                width={40.07129}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={158.18994}
                y={58.48047}
                width={34.50342}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={159.78613}
                y={62.29297}
                width={31.16553}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={159.78613}
                y={66.10547}
                width={31.16553}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={159.78613}
                y={73.73047}
                width={31.16553}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={159.78613}
                y={77.54346}
                width={31.16553}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={168.375}
                y={129.09717}
                width={2}
                height={24.02588}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={164.5625}
                y={129.09717}
                width={2}
                height={24.02539}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={145.49951}
                y={129.09717}
                width={2}
                height={14.38574}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={141.68604}
                y={129.09717}
                width={2}
                height={14.38526}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={137.87329}
                y={129.09717}
                width={2}
                height={14.38477}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={134.06079}
                y={129.09717}
                width={2}
                height={14.38428}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={160.75}
                y={129.09717}
                width={2}
                height={24.02442}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={156.93726}
                y={129.09717}
                width={2}
                height={24.02393}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={153.12476}
                y={129.09717}
                width={2}
                height={14.38721}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={149.31201}
                y={129.09717}
                width={2}
                height={14.38623}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={114.99805}
                y={128.33887}
                width={2}
                height={15.13916}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={111.18555}
                y={128.33887}
                width={2}
                height={15.13867}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={130.24829}
                y={129.09717}
                width={2}
                height={14.3833}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={126.43579}
                y={129.09717}
                width={2}
                height={14.38281}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={122.62329}
                y={129.09717}
                width={2}
                height={14.38233}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={118.81079}
                y={129.09717}
                width={2}
                height={14.38184}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={108.22998}
                y={126.32471}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={122.51221}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={103.44922}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={99.63574}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={95.823}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={92.0105}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={118.69971}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={114.88696}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={111.07446}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={107.26172}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={72.94775}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={69.13525}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={88.198}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={84.3855}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={80.573}
                width={7.00391}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={76.7605}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={108.22998}
                y={65.31494}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={110.61035}
                y={43.87207}
                width={2}
                height={6.76075}
                transform="translate(64.21286 158.80127) rotate(-89.92551)"
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={42.43848}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={38.62598}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={34.81348}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={61.50244}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={57.68994}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={53.87744}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={50.06494}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={15.75098}
                width={6.94336}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={31.00098}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={27.18848}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={23.37598}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={108.22998}
                y={19.56348}
                width={9.60303}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={88.48389}
                y={346.49219}
                width={25.14941}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={88.48389}
                y={350.30469}
                width={26.38721}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={88.48389}
                y={354.11719}
                width={26.38721}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={88.48389}
                y={357.92969}
                width={26.38721}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={88.48389}
                y={331.24219}
                width={25.14941}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={88.48389}
                y={335.05469}
                width={25.14941}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={88.48389}
                y={338.86719}
                width={25.14941}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={88.48389}
                y={342.67969}
                width={25.14941}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={376.99316}
                width={24.55664}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={380.80566}
                width={24.55664}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={384.61816}
                width={24.55664}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={388.43066}
                width={24.55664}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.29053}
                y={361.74316}
                width={24.58057}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={365.55566}
                width={24.55664}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={369.36816}
                width={24.55664}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={373.18066}
                width={24.55664}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={407.49316}
                width={12.55713}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={411.30566}
                width={9.75}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={392.24316}
                width={24.55664}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={396.05566}
                width={15.56543}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={399.86816}
                width={15.8457}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={90.31445}
                y={403.68066}
                width={15.57715}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={172.02393}
                y={349.82617}
                width={2}
                height={30.31934}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={168.21143}
                y={349.82617}
                width={2}
                height={36.63574}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={164.39893}
                y={349.82617}
                width={2}
                height={34.29883}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={160.58643}
                y={349.82617}
                width={2}
                height={34.29883}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={187.27441}
                y={349.82617}
                width={2}
                height={30.31934}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={183.46143}
                y={349.82617}
                width={2}
                height={30.31934}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={179.64893}
                y={349.82617}
                width={2}
                height={30.31934}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={175.83643}
                y={349.82617}
                width={2}
                height={30.31934}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={141.52344}
                y={349.82617}
                width={2}
                height={34.74707}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={137.71094}
                y={349.82617}
                width={2}
                height={36.63574}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={133.89844}
                y={351.30469}
                width={2}
                height={35.15723}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={130.08594}
                y={349.82617}
                width={2}
                height={34.65332}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={156.77393}
                y={349.82617}
                width={2}
                height={36.63574}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={152.96143}
                y={349.82617}
                width={2}
                height={36.63574}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={149.14893}
                y={349.82617}
                width={2}
                height={34.74707}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={145.33594}
                y={349.82617}
                width={2}
                height={34.74707}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={126.27344}
                y={349.82617}
                width={2}
                height={30.75488}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={122.46094}
                y={349.82617}
                width={2}
                height={44.67383}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={118.64844}
                y={349.82617}
                width={2}
                height={44.67383}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={114.83594}
                y={349.82617}
                width={2}
                height={44.67383}
                style={{ fill: "#eaeaea" }}
              />
            </G>
            <G>
              <Rect
                x={190.76611}
                y={346.49219}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={350.30469}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={354.11719}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={357.92969}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={331.24219}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={335.05469}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={338.86719}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={342.67969}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={376.99316}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={201.40527}
                y={380.80176}
                width={29.11475}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.97021}
                y={380.80176}
                width={12.82324}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={201.40527}
                y={384.62207}
                width={29.11475}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.97021}
                y={384.62207}
                width={12.7959}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={212.01709}
                y={388.43164}
                width={18.50293}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.97021}
                y={388.43164}
                width={12.85254}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={361.74316}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={365.55566}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={369.36816}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={190.76611}
                y={373.18066}
                width={41.44629}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.96973}
                y={407.49316}
                width={52.54639}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.96973}
                y={411.30566}
                width={52.54639}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={212.01709}
                y={392.24219}
                width={18.50293}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.97021}
                y={392.24219}
                width={12.82324}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={212.01709}
                y={396.05176}
                width={18.50293}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.97021}
                y={396.05176}
                width={23.43506}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.96973}
                y={399.86816}
                width={52.54639}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.96973}
                y={403.68066}
                width={52.54639}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.96973}
                y={415.11816}
                width={52.54639}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
              <Rect
                x={177.96973}
                y={418.93066}
                width={52.54639}
                height={2}
                style={{ fill: "#eaeaea" }}
              />
            </G>
          </G>
          <Path
            d="M563.69965,210.79453l-326.0625,.00485-.03036-31.24487-8.80455-.01215,.23682-1.83379,1.26907-2.05237,1.62732-1.22656,1.46455-.42168-2.12219-1.02011-1.39355-1.16583-.7074-1.29942-.44934-1.35408-.00607-1.86414,.31152-1.60034s.16425-.53217,.50214-1.11389c.24216-.41692,1.00674-1.25153,1.35408-1.48767,1.02374-.69601,2.60071-1.27852,2.60071-1.27852,0,0-1.21397-.14549-2.13924-.72528-.79892-.50061-1.5006-1.3936-1.75484-1.74269-1.17192-1.60912-.83795-3.36395-.83795-3.36395l6.75253,.05177,.37228-.50258-.0144-5.25089-.34612-.52827-6.83112-.03036s.08745-2.80731,1.68871-4.43634c1.56982-1.59705,3.01717-1.61147,3.01717-1.61147,0,0-2.41063-.66792-3.73434-2.61708-.31398-.46233-.59801-.967-.77116-1.61517-.13188-.49368-.20038-1.42694-.20038-1.42694l7.10435-.01215,.14961-95.26153,7.075,.02932s-.04327-1.43296-.50095-2.85996c-.47536-1.48209-1.84982-2.83898-2.35901-3.21518-1.25726-.92892-1.41319-.90819-2.36812-1.27514-1.77023-.68025-3.6888-.34611-3.6888-.34611l-.04703-2.00306-5.68201,.23562,.33932-2.55101,.35217-1.0019,.88654-1.24175,1.57875-1.3389,2.28918-.79545h0c-2.91547,0-5.27892-2.36345-5.27893-5.27891v-1.60567h-1.38545v-1.41992l-.00583-1.07007h-1.59402l-.03003-3.24023,337.56503,.13932-.25208,172.26677h.86084v24.61575l.00006-.00003Z"
            style={{ fill: "#d6e1fc" }}
          />
          <Path
            d="M99.96774,414.25845v-.60172c0-3.28699,2.66463-5.9516,5.95161-5.9516h0v-13.16443h20.83065v8.80646h2.02016v10.86292l-28.80242,.0484v-.00003Z"
            style={{ fill: "#c0f9cc" }}
          />
          <Path
            d="M564.10339,210.80099l.10498,198.29767-1.19318,1.27515-.00909,3.46109,1.03833-.00912-.02734,17.60617H230.48999l.01926-5.57452h0c-2.93947-.00003-5.32236-2.38297-5.32234-5.32242v-.04391l7.32007-.03003,.00227-6.77771,23.58893,.00031v-3.259h-20.33817l-.15398-126.63174-7-.08066s.78915-2.92087,1.34274-3.61694c.57445-.72229,3.16936-2.05646,3.16936-2.05646,0,0-2.8586-1.47296-3.39919-2.18951-.6116-.81067-1.20969-3.91934-1.20969-3.91934l7.29953-.02454-.07291-6.07022-7.28709-.02618,1.25751-3.8812,3.16187-2.15103-3.08064-2.08066-.88506-4.02391v-.56155c-.00002-3.09331,2.50432-5.60268,5.59763-5.60886h-.22952c-3.02599-.00002-5.47902-2.45306-5.479-5.47903h0l8.84189,.11304v-31.33482h326.46994v-.00003Z"
            style={{ fill: "#fce3e2" }}
          />
          <Path
            d="M232.45274,413.67401l.05421,6.78711-7.32007,.03003v.32626c0,2.8689,2.32571,5.19461,5.19463,5.19461h4.68855v4.03998h16.78979v-2.22998h12.4502l-.02002-8.56757h-1.13354c-3.02463,0-5.47659-2.45197-5.47656-5.47659v-.10583l-25.22717,.00204-.00002-.00006Z"
            style={{ fill: "#a2dda2" }}
          />
          <Path
            d="M563.98389,429.21005h-35.28821l-.03644-2.63889-2.61084-.04251v-12.96378l25.0412-.01233,.02734,6.15714c0,.00101,.17877,.04736,.17981,.04736l.24902-.0126c2.64062,0,5.48706-2.58414,5.47974-5.9639l-.00122-.56161,.00122,.5528c.00732,3.38412,2.58136,6.06546,5.96545,6.06546l-.03033-6.01138h1.08386l-.06055,15.38425h-.00006Z"
            style={{ fill: "#f9eba7" }}
          />
          <Rect
            x={113.76001}
            y={329.46985}
            width={77.52338}
            height={20.35669}
            style={{ fill: "#9fb2f6" }}
          />
          <G>
            <Path
              d="M158.97478,339.27222v-1.08554c0-.50494-.41347-.9184-.91843-.9184s-.91843,.41348-.91843,.9184v2.33432c0,.18027,.05426,.34698,.14439,.48917l1.69244-1.73792,.00002-.00003Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M163.01503,346.47107h2.40128c.66331,.00351,.68826-1.01379,0-1.01556h-1.2291l2.34309-2.33517c.51543-.52155-.21791-1.27194-.76486-.72458l-2.31111,2.31113v-1.21198c.00658-.66333-1.01949-.68872-1.01598,0v2.38287c-.00349,.35571,.23453,.5968,.57668,.59332"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M158.97478,335.79651c0,.50757-.41087,.91843-.91843,.91843-.50713,0-.91843-.41086-.91843-.91843s.41129-.9184,.91843-.9184c.50755,0,.91843,.41086,.91843,.9184"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M164.42676,336.22263h-2.13348c-.44237,0-1.01115,.18115-1.34851,.52023l-1.97726,1.97202-1.82063,1.78299h.00523l-1.71782,1.72437c-.16319,.1597-.18333,.16409-.50053,.16934h-1.0545c-1.05447-.00525-1.68761,.94641-1.69069,1.74887,.0031,.80859,.63622,1.82764,1.78912,1.82764h1.86703c.44585,0,.97966-.16934,1.42509-.58545l5.47896-5.46408c.11464-.10284,.17982-.13608,.38284-.13782,0,0,.75304,.00174,1.35289,0,.65063,.00174,1.57039-.73465,1.56862-1.80051,.00175-1.05273-.92628-1.75412-1.62636-1.75763m-.09143,2.63535h-1.1591c-.48873,.00351-.7066,.07132-.9875,.35092l-5.52403,5.52402c-.21922,.22403-.50363,.31241-.86461,.31241h-1.8224c-.46902,0-.88164-.39554-.87813-.91797-.00349-.51718,.39073-.80771,.79327-.80597h1.24876c.36708-.00174,.60643-.10675,.81471-.3111l5.61372-5.61548c.23102-.23276,.46074-.2612,.85321-.2612h1.91864c.47079,0,.78496,.52243,.78802,.8331-.00307,.31284-.22575,.89478-.79457,.89127"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M154.30019,335.79697h-2.40125c-.66331-.00351-.68826,1.01422,0,1.01553h1.2291l-2.34309,2.33521c-.51543,.52155,.21793,1.27151,.76486,.72458l2.31152-2.3111v1.21198c-.00697,.66376,1.01907,.68869,1.01559,0v-2.38287c.00348-.35571-.23412-.5968-.57674-.59332"
              style={{ fill: "#fff" }}
            />
          </G>
          <Path
            d="M108.3501,151.2262h20.85555l.00612,4.11006,4.70345-.01822v5.94763l-3.51418,.04108c-.57597,.00673-.97984,.57059-.80086,1.11807l1.49698,4.57899-4.89108,.00911s-8.7902,4.22488-17.83608,5.74908l-.0199-21.5358v-.00002Z"
            style={{ fill: "#eaeaea" }}
          />
          <Path
            d="M143.94649,169.19885l2.29753-.49184,2.3317,.49184s1.47699,.5592,2.20416,1.63643c.16373,.24255,.79224,1.10332,.95636,1.34497,.71465,1.05226,.48067,1.08691,.5222,1.08691,.09344,0,3.64934-1.72751,3.64934-1.72751l-2.81494-6.24956,1.52159-.51781,2.16319,.08653,2.10397,.95636,1.52562,1.71689,.90627,2.06509,8.60266-3.79108s1.85806,2.03568,3.00114,3.5294c1.44209,1.88449,1.98102,3.77078,1.98102,3.77078l-1.91708,.68767,6.86584,16.15332,1.66376-.00607,2.77798,6.88274-25.06566,10.19658-15.27666-37.82162v-.00003Z"
            style={{ fill: "#eaeaea" }}
          />
          <Rect
            x={138.60622}
            y={50.51205}
            width={19.58372}
            height={14.56995}
            style={{ fill: "#28cae5" }}
          />
          <Rect
            x={119.38625}
            y={47.34716}
            width={18.02003}
            height={17.44995}
            style={{ fill: "#e6fcf3" }}
          />
          <Rect
            x={138.60622}
            y={47.32199}
            width={19.58008}
            height={2.26001}
            style={{ fill: "#e6fcf3" }}
          />
          <Path
            d="M178.39163,18.38316v16.56772h-1.43018l.03851-7.38311-.34004-.01214c-3.48975,.20286-6.43036,2.93101-6.43036,6.48197l-.01822,.91328h-42.76993v-1.01456c0-3.30747-2.39905-6.08979-5.64905-6.29265l-.62846-.04554-.04554,6.39393h-1.96997l.04355-15.60889h59.19968Z"
            style={{ fill: "#a2dda2" }}
          />
          <Polygon
            points="612.61694 426.11328 612.59271 429.21823 605.91919 429.21823 605.8999 413.5051 614.54462 413.43198 614.35486 426.12537 612.61694 426.11328"
            style={{ fill: "#e2c79f" }}
          />
          <Path
            d="M157.99355,209.8759l7.48691-2.85541,.0155,81.29842s-3.34862,1.79428-8.25,4.06451c-6.55293,3.03522-15.60912,6.38257-19.17339,7.57257,.08008,.37988,.1071,1.23959,.0834,1.63904-.18216,3.06946-2.50685,5.73846-5.98662,5.77628-2.35645,.02563-4.12822-1.54236-5.29839-3.16223-.2186,3.10587-2.50579,5.78369-5.64568,5.78369-2.98022,0-5.54773-1.81149-6.1676-4.68158l.11841-.26968,5.61973-.7049-.69222-3.06946-11.43985,1.85806,.02429-12.24136,2.28312-.27179-.00034-1.81097,2.15542-.08502-.02681-18.01291,2.14649-.04858,.05161-3.98331-2.19507-.04553-.05811-92.19801c8.19359-2.00989,13.76646-5.01057,13.89634-5.07063l.16016-.04004h14.38988l16.50281,40.55878,.00002,.00008Z"
            style={{ fill: "#e2c79f" }}
          />
          <Path
            d="M87.75806,290.65701H33.69355v33.66599h1.77419v5.12534h-3.54002l-3.26643,56.90692h59.09677v-35.41934s-8.90323,.06451-9.80645-9.93549h9.80645v-50.34341Z"
            style={{ fill: "#e2c79f" }}
          />
          <G>
            <Path
              d="M707.19995,388.28201l-.14984-.8938-7.44995-178.47003-3.74023-93.83997-4.08984-101.16623-146.53009-.00004-.25995,18.74623,3.02002,.11011,.08008,1.91992,14.77002,.5v102.16003l-.01001,36.31995v8.59009l-.01001,26.54993-1.28003,1.45007,.02002,.54993,.09985,2.69006,.3501,.04004,.77002,.07983-.09009,10.01001-.03003,2.64014h1.42017v111.15991l-.01001,36.32001v8.59003l.12823,26.76044-1.19318,1.27515-.00909,3.46109,1.03833-.00912-.01941,12.52255,4.15497,.00366v2.73999l37.72333,.00009-.00336-16.03012,7.18018,.35004,3.48999,.04999-.02429,4.23999s34.75427,3.539,45.01428,4.15897l-.38013,1.901,.19995-.47998,33.31012,3.4162-4.08112-24.09619h.94116l-3.58008-16.15002,14.92993,.07001v1.76001h4.30005l-.00006,.00006ZM567.87994,125.2982h5.08008v.21008c0,3.5,2.84009,6.34985,6.3501,6.34985h.36987v-7.10986h7.55005v8.09998h-12.1001v1.73999h9.61011v16.92004h-11.41992v1.72998c0,2.90991-2.37012,5.28003-5.29004,5.28003h-.15015v-33.22009Zm0,33.97009h.15015c3.19995,0,5.82983-2.5,6.03003-5.66016h10.6499v21.1001h-9.31006v2.01001h11.59009v1.22998c-3.15991,.18994-5.71997,2.64001-6.06006,5.76001h-13.05005v-24.43994Zm28.90015,188.09993h-9.54004v1.79004h9.54004v21.87h-15.15991c-.65015-2.92999-3.2002-5.14001-6.27002-5.29999v-2.79004h7.8999v-2.03998h-13.95996v-40.85999h9.02002v8.19h2.45996v-7.15002h.27002c2.81006,0,5.1001,2.28998,5.1001,5.09998h-.12012v2.35004h10.76001v18.83997Zm.13013-63.25h-9.67017v1.79004h9.67017v39.89996l-10.12018,.35382c-.18994-3.06-2.78632-5.48004-5.88641-5.48004h-.24347v-4.42999h-11.54004l.09991-46.22375h14.20996v-1.91003h-4.03979v-1.56c3.34985-.17999,6.02979-2.89996,6.17993-6.26001h11.34009v23.82001Zm90.12982,101.57379l3.58008,16.16003h-1.6001l-3.35986-16.89001,17.79987-.0238-6.72998-167.75-.44995-11.13-.8501-21.26001-5.3999-134.46997-.02002-.33997-3.32007-.23999v-5.46997h5.51001l5.77002,140.5199,.87012,21.26001,.18994,4.51001,7.38983,176.96381h-2.77002v-1.76001l-16.60986-.08002Z"
              style={{ fill: "#ffdef4" }}
            />
            <Circle
              cx={580.35962}
              cy={297.68982}
              r={4.29004}
              style={{ fill: "#ffdef4" }}
            />
          </G>
          <Path
            d="M567.59009,386.34201l21.53003,.07996v15.51004h-13.95013v-2.03229c0-3.26276-2.64502-5.90775-5.90778-5.90775h-.01227l.03162,7.94h-1.57166l-.11987-15.58997h.00006Z"
            style={{ fill: "#e2c79f" }}
          />
          <Path
            d="M618.70966,349.41974h11.12903v18.99527h-17.36267v-12.31784s6.1369-.34518,6.23364-6.67743Z"
            style={{ fill: "#cfe0a0" }}
          />
          <Path
            d="M565.47211,405.21133v-2.00562h23.37384v6.58823l-1.26605-.01215-.02826,2.50919-22.07953,.02972v-1.18869h6.52789v-.0947c0-3.21762-2.6084-5.82599-5.82599-5.82599h-.7019Z"
            style={{ fill: "#a2dda2" }}
          />
          <Path
            d="M580.44745,322.1778v-1.37106s3.56671-.02731,5.08777,2.24973,1.18408,5.06415,1.18408,5.06415h10.62915v43.64594h-15.92993s-1.24927-5.60483-6.43878-5.60483v-3.48386h8.04437v-1.36694h-14.05243v-41.54434h9.77417v8.16129h1.67743v-7.12106"
            style={{ fill: "#98d2fd" }}
          />
          <Path
            d="M585.26642,260.08395l12.07739-.0231v66.25403l-10.55377-.15289s-.42157-5.48004-6.12988-5.48004v-4.42999h-11.54004l-.01025-46.24319h14.21021v-1.53677l-4.229-.00333v-2.14954s6.17535,.08368,6.17535-6.2352v.00003Z"
            style={{ fill: "#98d2fd" }}
          />
          <Path
            d="M224.51613,35.952v9.41935h5.85484v31.66129h-28.1129v-3.95161h-9.66905v-13.7873s6.6368,.06149,6.06409-7.06754h-6.06409v-16.12903l31.92712-.14516h-.00002Z"
            style={{ fill: "#98d2fd" }}
          />
          <Path
            d="M142.8362,119.77709l.063,1.35233s-6.55646,.30645-6.55646,6.45161h33.40726v-32.09677h-11.26613v-4.35484s-5.8871-.70968-5.8871-6.14516h2.3871l.10417-18.70304-21.91821-.02277v53.44355s9.66637,.07509,9.66637,.0751Z"
            style={{ fill: "#98d2fd" }}
          />
          <Path
            d="M574.07007,153.24203h11.0993v21.76642h-9.35797v1.35484h11.72894v1.98387s-5.17743-.16936-6.26031,5.68549h-13.74774v-25.03226s6.02417-.24222,6.26611-5.75835h.27167v-.00002Z"
            style={{ fill: "#98d2fd" }}
          />
          <Path
            d="M529.41217,37.10019v3.08463l5.03375,.01822,.00604,10.28615h0c3.21295,0,5.80664-2.62518,5.76788-5.8379l-.01019-.84445,.00787,.65054c.04034,3.34299,2.76178,6.03181,6.10504,6.03181h0s-.03229-7.10171-.03229-7.15009,2.96771-.01613,2.96771-.01613l.03229,7.02145h0c3.1698,0,5.72961-2.58809,5.69482-5.75771l-.00128-.11857,.00128,.11857c.03503,3.19007,2.63098,5.75771,5.82129,5.75771h0v-9.77951h2.19354v-3.46471h-33.58777Z"
            style={{ fill: "#f9eba7" }}
          />
          <Path
            d="M237.37012,195.42197h8.35986v-12.83997h-.00125c-2.30399,.00217-4.17464,1.87323-4.16965,4.17722l.00084,.38873-.00082-.37733c-.005-2.30997-1.87901-4.17992-4.189-4.17992h0v12.83125l.00002,.00002Z"
            style={{ fill: "#f9eba7" }}
          />
          <Path
            d="M567.45087,124.93198l5.92029,.08321s-.29053,6.14649,5.87079,6.43681v-7.08008h8.49805v8.95105h-12.22388v.94354h9.62903l.0484,17.68549h-11.49847s1.11139,6.30646-6.19507,7.04839l-.04913-34.06841Z"
            style={{ fill: "#98d2fd" }}
          />
          <Rect
            x={524.625}
            y={409.66501}
            width={32.34979}
            height={3.72531}
            style={{ fill: "#fce3e2" }}
          />
          <Path
            d="M573.32007,152.86191v.38013h.75v-.38013h-.75Zm0,0v.38013h.75v-.38013h-.75Z"
            style={{ fill: "#dde9f6" }}
          />
          <Path
            d="M580.6499,344.36197c-2.36987,0-4.29004-1.91998-4.29004-4.28998,0-2.35999,1.92017-4.27997,4.29004-4.27997,2.37012,0,4.29004,1.91998,4.29004,4.27997,0,2.37-1.91992,4.28998-4.29004,4.28998Z"
            style={{ fill: "#ffcaeb" }}
          />
          <Rect x={614.80005} y={185.03207} width={2.94995} height={3.83984} />
          <Polygon
            points="662.47589 76.0878 665.62085 73.62781 679.56189 73.62781 682.70587 76.08481 682.70587 174.27081 662.47589 174.27081 662.47589 76.0878"
            style={{ fill: "#ed3624" }}
          />
          <Path d="M682.42596,55.38193c-.55005-1.27991-1.83984-2.18994-3.32007-2.18994h-13.03979c-1.46021,0-2.71997,.88-3.28003,2.13-.18994,.43005-.30005,.90002-.31006,1.39001v117.56006h20.22998V56.77206c0-.48999-.1001-.96008-.28003-1.39014h0Zm-.94995,117.66016h-17.77002V56.78207c0-1.30005,1.06006-2.36011,2.36011-2.36011h13.03979c1.31006,0,2.37012,1.06006,2.37012,2.36011v116.26001Z" />
          <Polygon points="679.56592 61.59131 665.62592 61.59131 663.70587 63.09131 662.47589 64.04132 662.47589 65.86133 663.70587 64.81131 665.97589 62.88132 666.0459 62.82132 679.13586 62.82132 681.47589 64.74133 682.70587 65.74133 682.70587 64.15134 681.47589 63.15134 679.56592 61.59131" />
          <Polygon points="679.56158 67.6915 665.62054 67.6915 662.71252 69.96552 663.47253 70.93652 666.04358 68.92252 679.13855 68.92252 681.71057 70.93652 682.46954 69.96552 679.56158 67.6915" />
          <Polygon points="679.56158 73.6283 665.62054 73.6283 662.71252 75.90231 663.47253 76.87332 666.04358 74.85931 679.13855 74.85931 681.71057 76.87332 682.46954 75.90231 679.56158 73.6283" />
          <Rect x={665.21698} y={68.30701} width={1.23102} height={5.93701} />
          <Rect x={678.552} y={68.30701} width={1.23102} height={5.93701} />
          <Path d="M677.15601,69.22101h-9.13v4.10999h9.13v-4.10999Zm-8.01001,1.12h6.89001v1.85999h-6.89001v-1.85999Z" />
          <Polygon points="666.10651 62.1008 665.05347 68.34482 666.2655 68.54681 667.3175 62.30283 666.10651 62.1008" />
          <Polygon points="678.7204 62.1008 677.50934 62.30283 678.56134 68.54681 679.77338 68.34482 678.7204 62.1008" />
          <Polygon points="682.13818 55.27951 681.74414 56.44254 683.59918 57.06754 683.99414 55.90451 682.13818 55.27951" />
          <Rect
            x={661.18993}
            y={55.5596}
            width={1.95367}
            height={1.22794}
            transform="translate(16.82752 214.78489) rotate(-18.6574)"
          />
          <Polygon
            points="638.33929 76.08499 641.48425 73.625 655.42529 73.625 658.56927 76.082 658.56927 174.26801 638.33929 174.26801 638.33929 76.08499"
            style={{ fill: "#ed3624" }}
          />
          <Path d="M658.29004,55.38193c-.55005-1.27991-1.84009-2.18994-3.32007-2.18994h-13.04004c-1.45996,0-2.71997,.88-3.28003,2.13-.18994,.43005-.2998,.90002-.30981,1.39001v117.56006h20.22998V56.77206c0-.48999-.1001-.96008-.28003-1.39014h0Zm-.94995,117.66016h-17.77002V56.78207c0-1.30005,1.05981-2.36011,2.35986-2.36011h13.04004c1.31006,0,2.37012,1.06006,2.37012,2.36011v116.26001Z" />
          <Polygon points="655.42932 61.58841 641.48932 61.58841 639.56927 63.08841 638.33929 64.03842 638.33929 65.85843 639.56927 64.80841 641.83929 62.87842 641.9093 62.81842 654.99927 62.81842 657.33929 64.73843 658.56927 65.73843 658.56927 64.14844 657.33929 63.14844 655.42932 61.58841" />
          <Polygon points="655.42499 67.68869 641.48395 67.68869 638.57593 69.96271 639.33594 70.93372 641.90698 68.91971 655.00195 68.91971 657.57397 70.93372 658.33295 69.96271 655.42499 67.68869" />
          <Polygon points="655.42499 73.62549 641.48395 73.62549 638.57593 75.89951 639.33594 76.87051 641.90698 74.85651 655.00195 74.85651 657.57397 76.87051 658.33295 75.89951 655.42499 73.62549" />
          <Rect x={641.07996} y={68.30399} width={1.23102} height={5.93701} />
          <Rect x={654.41498} y={68.30399} width={1.23102} height={5.93701} />
          <Path d="M653.01898,69.21799h-9.13v4.10999h9.13v-4.10999Zm-8.01001,1.12h6.89001v1.85999h-6.89001v-1.85999Z" />
          <Polygon points="641.96991 62.09799 640.91687 68.34201 642.12891 68.54401 643.18091 62.30002 641.96991 62.09799" />
          <Polygon points="654.5838 62.09799 653.37274 62.30002 654.42474 68.54401 655.63678 68.34201 654.5838 62.09799" />
          <Polygon points="658.00171 55.27658 657.60767 56.43961 659.46271 57.06461 659.85767 55.90158 658.00171 55.27658" />
          <Rect
            x={637.05341}
            y={55.55667}
            width={1.95367}
            height={1.22794}
            transform="translate(15.56004 207.06325) rotate(-18.6574)"
          />
          <Polygon
            points="614.11621 76.08499 617.26117 73.625 631.20221 73.625 634.34619 76.082 634.34619 174.26801 614.11621 174.26801 614.11621 76.08499"
            style={{ fill: "#ed3624" }}
          />
          <Path d="M634.07007,55.38193c-.55005-1.27991-1.84009-2.18994-3.32007-2.18994h-13.04004c-1.45996,0-2.71997,.88-3.28003,2.13-.18994,.43005-.30005,.90002-.30981,1.39001v19.37l1.22998-.96008v-18.33984c0-1.30005,1.06006-2.36011,2.35986-2.36011h13.04004c1.31006,0,2.37012,1.06006,2.37012,2.36011v18.33984l1.22998,.96008v-19.30994c0-.48999-.1001-.96008-.28003-1.39014h0Zm0,.00001c-.55005-1.27991-1.84009-2.18994-3.32007-2.18994h-13.04004c-1.45996,0-2.71997,.88-3.28003,2.13-.18994,.43005-.30005,.90002-.30981,1.39001v117.56006h20.22998V56.77206c0-.48999-.1001-.96008-.28003-1.39014h0Zm-.94995,117.66016h-17.77002V56.78207c0-1.30005,1.06006-2.36011,2.35986-2.36011h13.04004c1.31006,0,2.37012,1.06006,2.37012,2.36011v116.26001Zm.94995-117.66016c-.55005-1.27991-1.84009-2.18994-3.32007-2.18994h-13.04004c-1.45996,0-2.71997,.88-3.28003,2.13-.18994,.43005-.30005,.90002-.30981,1.39001v19.37l1.22998-.96008v-18.33984c0-1.30005,1.06006-2.36011,2.35986-2.36011h13.04004c1.31006,0,2.37012,1.06006,2.37012,2.36011v18.33984l1.22998,.96008v-19.30994c0-.48999-.1001-.96008-.28003-1.39013Zm0,0c-.55005-1.27991-1.84009-2.18994-3.32007-2.18994h-13.04004c-1.45996,0-2.71997,.88-3.28003,2.13-.18994,.43005-.30005,.90002-.30981,1.39001v117.56007h20.22998V56.77206c0-.48999-.1001-.96008-.28003-1.39013Zm-.94995,117.66016h-17.77002V56.78207c0-1.30005,1.06006-2.36011,2.35986-2.36011h13.04004c1.31006,0,2.37012,1.06006,2.37012,2.36011v116.26001Z" />
          <Polygon points="631.20618 61.58841 617.26617 61.58841 615.34613 63.08841 614.11615 64.03842 614.11615 65.85843 615.34613 64.80841 617.61615 62.87842 617.68616 62.81842 630.77612 62.81842 633.11615 64.73843 634.34613 65.73843 634.34613 64.14844 633.11615 63.14844 631.20618 61.58841" />
          <Polygon points="631.20203 67.68869 617.26099 67.68869 614.35297 69.96271 615.11298 70.93372 617.68402 68.91971 630.77899 68.91971 633.35101 70.93372 634.10999 69.96271 631.20203 67.68869" />
          <Polygon points="631.20203 73.62549 617.26099 73.62549 614.35297 75.89951 615.11298 76.87051 617.68402 74.85651 630.77899 74.85651 633.35101 76.87051 634.10999 75.89951 631.20203 73.62549" />
          <Rect x={616.85699} y={68.30399} width={1.23102} height={5.93701} />
          <Rect x={630.19196} y={68.30399} width={1.23102} height={5.93701} />
          <Path d="M628.79602,69.21799h-9.13v4.10999h9.13v-4.10999Zm-8.01001,1.12h6.89001v1.85999h-6.89001v-1.85999Z" />
          <Polygon points="617.74683 62.09799 616.69379 68.34201 617.90582 68.54401 618.95782 62.30002 617.74683 62.09799" />
          <Polygon points="630.36072 62.09799 629.14966 62.30002 630.20166 68.54401 631.4137 68.34201 630.36072 62.09799" />
          <Polygon points="633.77863 55.27658 633.38458 56.43961 635.23962 57.06461 635.63458 55.90158 633.77863 55.27658" />
          <Rect
            x={612.8302}
            y={55.55667}
            width={1.95367}
            height={1.22794}
            transform="translate(14.28707 199.31404) rotate(-18.6574)"
          />
          <G>
            <G>
              <Polygon
                points="223.46162 60.78172 201.98065 60.65672 201.99165 58.65672 221.46162 58.76973 221.46162 57.88875 201.98564 57.88875 201.98564 55.88875 223.46162 55.88875 223.46162 60.78172"
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={159.78798}
                y={81.50191}
                width={5.05823}
                height={2}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={196.47998}
                y={417.98462}
                width={15.41016}
                height={2.202}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={264.04288}
                y={412.27463}
                width={30.04797}
                height={2}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={612.4776}
                y={367.66266}
                width={24.53198}
                height={1.5}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={612.4776}
                y={348.25967}
                width={24.53198}
                height={1.5}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={629.34058}
                y={349.00967}
                width={1.5}
                height={20.24997}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={587.24463}
                y={347.36469}
                width={10.03998}
                height={1.79001}
                style={{ fill: "#3d3f42" }}
              />
              <Polygon
                points="694.68726 426.6947 661.06824 423.24969 661.63922 421.66272 692.70325 424.7597 688.59021 402.11374 690.52625 402.11374 694.68726 426.6947"
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={678.81653}
                y={265.41876}
                width={19.47351}
                height={1.62}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={678.81653}
                y={265.41873}
                width={1.62}
                height={7.50198}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={605.7196}
                y={186.49388}
                width={30.78192}
                height={0.28085}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={614.79956}
                y={185.03281}
                width={2.95203}
                height={3.839}
                style={{ fill: "#3d3f42" }}
              />
            </G>
            <Path
              d="M225.33008,14.94199v2.19995h253.42993v-2.19995H225.33008Zm253.1499,1.91992H225.60986v-1.62988h252.87012v1.62988Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M191.98999,11.73203v5.40991h31.88989v-5.40991h-31.88989Zm31.61011,5.12988h-31.33008v-4.83984h31.33008v4.83984Zm-31.61011-5.12988v5.40991h31.88989v-5.40991h-31.88989Zm31.61011,5.12988h-31.33008v-4.83984h31.33008v4.83984Zm-31.61011-5.12988v5.40991h31.88989v-5.40991h-31.88989Zm31.61011,5.12988h-31.33008v-4.83984h31.33008v4.83984Zm-31.61011-5.12988v5.40991h31.88989v-5.40991h-31.88989Zm31.61011,5.12988h-31.33008v-4.83984h31.33008v4.83984Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M610.58008,93.02206v-.73999h-8.34009V45.18198h-5.76001v1.48999h1.18994v3.34009h1.93994l.21021,43.07996h-1.55005v.27991h1.55005l.01001,1.69006h-9.15015v-.34998c0-3.53003-2.86987-6.41003-6.40991-6.41003h-1.26001V47.11191l-.58008-1.61987v-7.63013h-.13989c-4.43018,0-8.03003,3.6001-8.03003,8.02002v.69006h-8.65015v-11.15002l-17.36987-.52002v-2.26001h-3V13.91196h-40.34985v.28003h40.06982v1.45996h-15.71997v2.27002h-2.02002l-.44995-.43994h-13.79004v-1.83008h-8.08984v.28003h7.80981v1.83008h13.96021l.43994,.43994h7.95996l-.01001,.25c-.08008,2.76001-2.42993,5.07007-5.36011,5.17993l.01001,.29004c2.96021,.12012,5.34009,2.56006,5.36011,5.55005v.22998h-8.26001v5.83008h-3.15015v6.0199h10.67017v9.06995h.13989c2.53003,0,4.78003-1.60986,5.6001-4l.21997-.87988,.21997,.86987c.91016,2.40015,3.25,4.01001,5.81006,4.01001h.13989v-7.16992h2.65015v7.03003h.13989c2.45996,0,4.67993-1.56006,5.52002-3.88l.20996-.89001,.22998,.89001c.87012,2.31995,3.11011,3.88,5.58008,3.88h.13989v-9.80005h1.93994l.01025,75h25.43994l-.01001,.23999c-.13989,4.23999-3.57007,7.56006-7.80005,7.56006h-1.20996v7.97998l-.25-.01001c-3.05005-.20996-5.43994-2.76001-5.43994-5.82007v-.72998h-10.77002v61.18005h18.69995v-1.53992c0-3.15015,2.45996-5.77002,5.59009-5.97009l.25-.02002v7.53003h1.68994v-61.72998h-9.48999v-.58997h.92993c2.10986,0,4.12012-.82007,5.64014-2.30005,1.50977-1.46997,2.37988-3.44995,2.43994-5.56006l.01001-.21997h.01001v-8.82996h11.29004l.20996,43.52991h-1.97021v4.42004h1.99023l.07983,16.03003-.43994,.10999c-.09009-.15991-.25-.26001-.41992-.26001-.27002,0-.48999,.21997-.48999,.48999s.21997,.48999,.48999,.48999c.17993,0,.32983-.09998,.41992-.27002l.43994,.11011,.05005,8.92993-.45996,.08008c-.07007-.19006-.25-.32007-.44995-.32007-.27002,0-.48999,.21997-.48999,.48999s.21997,.48999,.48999,.48999c.19995,0,.37988-.12988,.44995-.32996l.45996,.07996,.04004,9.17004-.46997,.01001c0-.27002-.21997-.47009-.47998-.47009-.27002,0-.48999,.21008-.48999,.47998,0,.27002,.21997,.49011,.48999,.49011,.26978,0,.47998-.21008,.47998-.4801l.46997,.01001,.08984,18.06006h-36.67993v2.48999h-3.55981v.28003h3.55981v2.12h35.42017l-.2002,.34998c-.04004,.09009-.06982,.16003-.06982,.22998,0,.27002,.21997,.48999,.48999,.48999,.26978,0,.48999-.21997,.48999-.48999,0-.06995-.02002-.13989-.07007-.22998l-.19995-.34998h1v8.18005h.28003v-8.18005h2.1499v-4.89001h-.01001v-.46997l.39014-.17993c.06982,.05994,.16992,.12988,.30981,.12988,.27002,0,.48999-.21997,.48999-.48999s-.21997-.48999-.48999-.48999c-.10986,0-.20996,.04004-.30981,.12l-.38013-.18005,.04004-17.58984h2.94995v-3.47009h-3.73999V93.02206h8.34009Zm-47.47021,32.1599h4.38013v25.6001h-.75v-24.40015h-2.16992v24.40015h-1.46021v-25.6001Zm3.3501,1.47998v24.12012h-1.6001v-24.12012h1.6001Zm-3.3501,24.40002h4.38013v3.55994h-4.38013v-3.55994Zm3.3501,3.89001v29.10999h-1.6001v-29.13l1.6001,.02002Zm14.79004,30.84998h-18.14014v-30.90002h1.47021v29.44006h2.15991v-29.44006h.75v29.44006h13.76001v1.45996Zm6.1001-7.5199l-.22021,.0199c-3.0498,.18005-5.5,2.52002-5.83984,5.55005l-.02002,.20996h-13.5v-24.91003h.39014c3.05981,0,5.59985-2.38989,5.78979-5.43994l.01001-.21997h11.12012v21.56995h-9.32007v1.54004h11.59009v1.68005Zm.52002-53.65015h.90991v61.17004h-1.13013v-7.5199h-.02002v-1.96008h-11.58984v-.97998h9.31982v-22.13h-11.3999v-1.07007h11.41992v-17.94995h-9.59985v-.70996h12.09009v-8.8501Zm-.28003,0v8.57007h-12.1001v1.28003h9.61011v17.37988h-11.42017v1.49011c0,3.03992-2.47998,5.5199-5.51978,5.5199h-.39014v-33.68994h5.55005v.44995c0,3.37012,2.73999,6.11011,6.10986,6.11011h.14014v-7.11011h8.02002Zm-39.63013-91.70996v1.43005h-12.22998v-1.43005h12.22998Zm-4.63989-16.67993l1.63989-.28003v16.18994l-1.63989,.36011V16.24202Zm-1.90991,0l1.62988-.28003v16.18994l-1.62988,.36011V16.24202Zm-1.92017,0l1.63013-.28003v16.18994l-1.63013,.36011V16.24202Zm-1.91992,0l1.63989-.28003v16.18994l-1.63989,.36011V16.24202Zm-7.88013,13.73999h5.65015v-.47998c.10986-3.26001-2.57007-5.70996-4.83008-5.70996,0,0,4.63013-.37012,4.83008-5.7301v-.14001h-5.82007v-1.98999h7.77002v16.70996h-1.84009v1.88013l-5.76001-.17004v-4.37001Zm33.16992,10.41992h-2.21973v9.80005l-.25-.02002c-2.96021-.19995-5.28027-2.67993-5.28027-5.6499v-.27002h-.27979v.33997c0,2.93005-2.28003,5.38-5.2002,5.57996l-.25,.02002v-7.03003h-3.20996v7.17004l-.25-.01001c-3.10986-.21008-5.54004-2.80994-5.54004-5.92004v-.07996h-.27979v.37c0,2.94995-2.31006,5.41992-5.25,5.63l-.25,.01001,.00977-10.28003h-5.06982v-2.81995h33.31982v3.15991Zm25.46021,75h-25.17017v-19.31995h1.2002l.09985,17.90002h22.67017v-18.18005h-23.97021V36.96201h-33.88989v3.38h5.06006v.93005h-10.39014v-5.46008h3.15015v-5.82996h2.33008v4.6499l35.91992,1.06006v11.16003h1.36987v48h21.62012v20.54993Zm-23.69019-19.31995h22.21021v17.62h-22.11011l-.1001-17.62Zm2.3501-1.51001V46.85202h7.56006v-.97009c0-4.12988,3.22998-7.52991,7.35986-7.72998l.25-.02002v7.3501l.58008,1.62v41.47998h1.54004c3.22998,0,5.91992,2.52991,6.12012,5.73999l.02002,.25h-23.43018v-.00003Zm22.04004,12l-.19995-1.63h10.5l.35986,1.63h-10.65991Zm0-1.92004l-.19995-1.62988h10.5l.35986,1.62988h-10.65991Zm0-1.90991l-.19995-1.64001h10.5l.35986,1.64001h-10.65991Zm0-1.92004l-.19995-1.64001h10.5l.35986,1.64001h-10.65991Zm0-1.92004l-.19995-1.63989h10.5l.35986,1.63989h-10.65991Zm0-1.91992l-.19995-1.64001h10.5l.35986,1.64001h-10.65991Zm13.67993,115.81994h-38.70996v-4.32996h38.70996v4.32996Zm3-26.94006v2.89014h-2.94995l-.05005,19.42993h-2.03979l-.26025-53.66992h-1.98975v-3.84009h1.96973l-.48975-100.94995h-1.94019v-3.34009h-1.18994v-.90991h5.19995V185.86191h3.73999Zm-2.02002,27.31006c-.10986,0-.20996,.04004-.30981,.13l-.02002-.0199-.09009,.1499c-.05005,.09009-.07007,.16003-.07007,.22998,0,.27002,.22021,.48999,.48999,.48999,.27002,0,.48999-.21997,.48999-.48999s-.21997-.48999-.48999-.48999Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M230.19995,266.68198v4.07001h4.36011v-4.07001h-4.36011Zm.75,3.32001v-2.57001h2.86011v2.57001h-2.86011Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M230.42993,266.91202v3.59998h3.89014v-3.59998h-3.89014Zm3.61011,3.32001h-3.33008v-3.04004h3.33008v3.04004Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M230.19995,150.74203v4.06995h4.36011v-4.06995h-4.36011Zm3.61011,3.31995h-2.86011v-2.56995h2.86011v2.56995Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M193.37012,74.09201v3.16003h7.96997v-3.16003h-7.96997Zm7.68994,2.87h-7.41016v-2.59009h7.41016v2.59009Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M138.60986,47.32199v2.26001h19.58008v-2.26001h-19.58008Zm19.30029,1.97998h-19.02002v-1.69995h19.02002v1.69995Zm-19.30029-1.97998v2.26001h19.58008v-2.26001h-19.58008Zm19.30029,1.97998h-19.02002v-1.69995h19.02002v1.69995Zm-19.30029-1.97998v2.26001h19.58008v-2.26001h-19.58008Zm19.30029,1.97998h-19.02002v-1.69995h19.02002v1.69995Zm-19.30029-1.97998v2.26001h19.58008v-2.26001h-19.58008Zm19.30029,1.97998h-19.02002v-1.69995h19.02002v1.69995Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M130.80005,419.67197v8.18005h31.29004v1.13h4.34985v-9.31006h-35.63989Zm35.36011,9.03003h-3.79004v-1.13h-31.29004v-7.62h35.08008v8.75Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M342.1499,425.38199v3.98999h64.57007v1.04999h4.04004v-1.04999h55.05005v1.04999h4.0498v-1.04999h55.03027v-3.98999h-182.74023Zm68.33008,4.76001h-3.47998v-3.47998h3.47998v3.47998Zm59.09009,0h-3.47998v-3.47998h3.47998v3.47998Zm55.03979-1.04999h-54.75v-2.71002h-4.0498v2.71002h-55.05005v-2.71002h-4.04004v2.71002h-64.29004v-3.42004h182.17993v3.42004Zm-182.45996-3.71002v3.98999h64.57007v1.04999h4.04004v-1.04999h55.05005v1.04999h4.0498v-1.04999h55.03027v-3.98999h-182.74023Zm68.33008,4.76001h-3.47998v-3.47998h3.47998v3.47998Zm59.09009,0h-3.47998v-3.47998h3.47998v3.47998Zm55.03979-1.04999h-54.75v-2.71002h-4.0498v2.71002h-55.05005v-2.71002h-4.04004v2.71002h-64.29004v-3.42004h182.17993v3.42004Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={160.31905}
              y={349.07666}
              width={7.81004}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={160.55359}
              y={349.31125}
              width={7.341}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M166.05005,330.22202v-.75h-8.38013l2.93018-2.94-.53003-.53003-3.44995,3.47003h-23.8501c.83008-.64001,1.37988-1.64001,1.37988-2.77002,0-1.94-1.57983-3.52002-3.52002-3.52002-1.94995,0-3.52002,1.58002-3.52002,3.52002,0,1.13,.54004,2.13,1.37012,2.77002h-14.71997v20.35999h22.59985l-4.35986,4.38,.53003,.52997,4.88989-4.90997h6.38013v-.75h-29.29004v-18.85999h51.54004Zm-35.42017-6.29004c1.52002,0,2.77002,1.23999,2.77002,2.77002s-1.25,2.77002-2.77002,2.77002c-1.52979,0-2.77002-1.23999-2.77002-2.77002s1.24023-2.77002,2.77002-2.77002Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M165.82007,329.99197v-.27997h-8.15015l-.15991-.40002,2.76001-2.77997-.19995-.20001-3.36011,3.38h-23.93994l-.1499-.41998c.81982-.64001,1.29004-1.58002,1.29004-2.59003,0-1.81-1.47021-3.28998-3.28027-3.28998-1.81982,0-3.28979,1.47998-3.28979,3.28998,0,1.01001,.46997,1.95001,1.28979,2.59003l-.1499,.41998h-14.48999v19.88h22.36987l.17017,.39996-4.19995,4.22003,.19995,.20001,4.79004-4.82001h6.25v-.28003h-29.30005v-19.32001h51.55005Zm-38.19995-3.28998c0-1.65997,1.34985-3.01001,3.00977-3.01001,1.65015,0,3,1.35004,3,3.01001,0,1.65002-1.34985,3-3,3-1.65991,0-3.00977-1.34998-3.00977-3Z"
              style={{ fill: "#3d3f42" }}
            />
            <Polygon
              points="191.28339 329.46765 182.56854 329.46765 182.56854 330.21765 190.53339 330.21765 190.53339 349.07654 183.45819 349.07654 183.45819 349.82654 191.28339 349.82654 191.28339 329.46765"
              style={{ fill: "#3d3f42" }}
            />
            <Polygon
              points="183.69273 349.59195 183.69273 349.31107 190.76791 349.31107 190.76791 329.98309 182.80307 329.98309 182.80307 329.70221 191.04884 329.70221 191.04884 349.59195 183.69273 349.59195"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M175.29004,323.18198c-1.93994,0-3.52002,1.58002-3.52002,3.52002s1.58008,3.52002,3.52002,3.52002c1.94995,0,3.52002-1.58002,3.52002-3.52002s-1.57007-3.52002-3.52002-3.52002Zm0,6.29004c-1.52002,0-2.77002-1.23999-2.77002-2.77002s1.25-2.77002,2.77002-2.77002c1.53003,0,2.77002,1.23999,2.77002,2.77002s-1.23999,2.77002-2.77002,2.77002Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M175.29004,323.41202c-1.81006,0-3.28003,1.47998-3.28003,3.28998s1.46997,3.28003,3.28003,3.28003c1.81982,0,3.29004-1.47003,3.29004-3.28003s-1.47021-3.28998-3.29004-3.28998Zm0,6.28998c-1.6499,0-3-1.34998-3-3,0-1.65997,1.3501-3.01001,3-3.01001,1.65991,0,3.01001,1.35004,3.01001,3.01001,0,1.65002-1.3501,3-3.01001,3Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M567.59009,386.34201l.11987,15.58997h1.54004v-.75h-.79004l-.10986-14.08997,20.02002,.07996v14.01001h-13.2002v.75h13.9502v-15.51001l-21.53003-.07996Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M570.08008,239.97202v16.88h27.69995v-16.88h-27.69995Zm5,3.57996h.10986v-.38l.18018-.31995-3.56006-2.13h24.25l-3.57007,2.13,.38013,.64996,4.15991-2.48999v14.79999l-6.17017-3.69-.37988,.65002,5.57007,3.33002h-24.22998l5.57007-3.33002-.38013-.65002-6.17993,3.70001v-14.82001l4.25,2.54999Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M570.32007,240.202v16.40997h27.22998v-16.40997h-27.22998Zm26.94995,15.60999l-.35986,.20001-5.96021-3.57001-.1499,.25,5.36987,3.21002-.11987,.42999h-24.22998l-.12012-.42999,5.37012-3.21002-.14014-.25-5.97998,3.58002-.34985-.20001v-14.82001l.34985-.20001,4,2.40002v-.09998l.1001-.17004-3.36011-2.01001,.12012-.43994h24.25l.11987,.43994-3.36987,2.01001,.1499,.25,3.9502-2.37,.35986,.20001v14.79999Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M616.83008,385.66202v-3.42004h-4.68018v9.01001h23.40015v-5.58997h-18.71997Zm-3.93018-2.67004h3.18018v3.07001h-3.18018v-3.07001Zm4.05005,7.51001h-4.05005v-3.69h4.05005v3.69Zm3.94019,0h-3.19019v-4.08997h3.19019v4.08997Zm13.90991,0h-13.15991v-4.08997h13.15991v4.08997Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M619,349.76199v.06c-.01001,1.70001-.67993,3.28998-1.89014,4.47998-1.11987,1.10004-2.58984,1.75-4.13989,1.83002l-.22998,.01001v11.52997h.23999v-11.31c1.62012-.07996,3.12988-.73999,4.29004-1.88995,1.26001-1.23999,1.94995-2.89001,1.95996-4.65002v-.06h-.22998Zm0,0v.06c-.01001,1.70001-.67993,3.28998-1.89014,4.47998-1.11987,1.10004-2.58984,1.75-4.13989,1.83002l-.22998,.01001v11.52002h.23999v-11.30005c1.62012-.07996,3.12988-.73999,4.29004-1.88995,1.26001-1.23999,1.94995-2.89001,1.95996-4.65002v-.06h-.22998Zm0,0v.06c-.01001,1.70001-.67993,3.28998-1.89014,4.47998-1.11987,1.10004-2.58984,1.75-4.13989,1.83002l-.22998,.01001v11.52002h.23999v-11.30005c1.62012-.07996,3.12988-.73999,4.29004-1.88995,1.26001-1.23999,1.94995-2.89001,1.95996-4.65002v-.06h-.22998Zm0,0v.06c-.01001,1.70001-.67993,3.28998-1.89014,4.47998-1.11987,1.10004-2.58984,1.75-4.13989,1.83002l-.22998,.01001v11.52002h.23999v-11.30005c1.62012-.07996,3.12988-.73999,4.29004-1.88995,1.26001-1.23999,1.94995-2.89001,1.95996-4.65002v-.06h-.22998Zm18.60986,5.69v-9.83002h-.75v2.61005l-1.09985,.02997-17.27002,.47003-.01001,1.02997v.06c-.01001,1.56-.62012,3.02002-1.72998,4.12-1.10986,1.09003-2.58008,1.69-4.1499,1.67999h-.37012v14.03003h25.37988v-7.54999l.21021-.01001c3.3999-.04999,6.16992-2.87,6.16992-6.28003v-.37l-6.38013,.01001Zm.2002,5.89001l-.9502,.01996v7.54004h-23.87988v-12.54004c1.62012-.07996,3.12988-.73999,4.29004-1.88995,1.26001-1.23999,1.94995-2.89001,1.95996-4.65002v-.35999l10.11011-.28003,1.5-.03998,6.01978-.15997v7.21997l6.37012-.01001c-.18994,2.83002-2.55005,5.10999-5.41992,5.15002Zm-18.81006-11.58002v.06c-.01001,1.70001-.67993,3.28998-1.89014,4.47998-1.11987,1.10004-2.58984,1.75-4.13989,1.83002l-.22998,.01001v11.52002h.23999v-11.30005c1.62012-.07996,3.12988-.73999,4.29004-1.88995,1.26001-1.23999,1.94995-2.89001,1.95996-4.65002v-.06h-.22998Zm0,0v.06c-.01001,1.70001-.67993,3.28998-1.89014,4.47998-1.11987,1.10004-2.58984,1.75-4.13989,1.83002l-.22998,.01001v11.52997h.23999v-11.31c1.62012-.07996,3.12988-.73999,4.29004-1.88995,1.26001-1.23999,1.94995-2.89001,1.95996-4.65002v-.06h-.22998Zm0,0v.06c-.01001,1.70001-.67993,3.28998-1.89014,4.47998-1.11987,1.10004-2.58984,1.75-4.13989,1.83002l-.22998,.01001v11.52997h.23999v-11.31c1.62012-.07996,3.12988-.73999,4.29004-1.88995,1.26001-1.23999,1.94995-2.89001,1.95996-4.65002v-.06h-.22998Zm0,0v.06c-.01001,1.70001-.67993,3.28998-1.89014,4.47998-1.11987,1.10004-2.58984,1.75-4.13989,1.83002l-.22998,.01001v11.52997h.23999v-11.31c1.62012-.07996,3.12988-.73999,4.29004-1.88995,1.26001-1.23999,1.94995-2.89001,1.95996-4.65002v-.06h-.22998Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={612.22345}
              y={343.8407}
              width={0.75}
              height={5.90921}
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M202,58.66196l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm-42.19995,25.61011v2h.12988v-2h-.12988Zm42.20996-22.84009l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm-37.41992,25.96997v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-2.95996,9.29993c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm9.65991,15.44995v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.87988-15.09009v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm0,0v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm-34.23022-25.96997v6.63h.02002v-6.63h-.02002Zm-1.30981-5.40991v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.01978,0h-.01978V127.72202h.01978V34.75204Zm-1.08984,94.17993v-44.57996h-2.67993v-3.75h2.67993v-30.74011l-2.87012-.02991v-3.56995h2.87012V18.50204h-.28003v27.47998h-2.86987v4.12988l2.86987,.02002v30.19006h-2.67993v4.30994h2.67993v44.58008l53.67017-.03003v23.86011h-14.23022v-9.72009h-48.55005v.28003h48.27002v9.71997h14.79004v-24.42004l-53.66992,.03003v.00002Zm1.07007-94.17993V127.72202h.01978V34.75204h-.01978Zm0,0V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm35.54004,31.37988v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm0,0v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm0,0v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm-34.23022-25.96997v6.63h.02002v-6.63h-.02002Zm-1.30981-5.40991v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.01978,0h-.01978V127.72202h.01978V34.75204Zm-1.08984,94.17993v-44.57996h-2.67993v-3.75h2.67993v-30.74011l-2.87012-.02991v-3.56995h2.87012V18.50204h-.28003v27.47998h-2.86987v4.12988l2.86987,.02002v30.19006h-2.67993v4.30994h2.67993v44.58008l53.67017-.03003v23.86011h-14.23022v-9.72009h-48.55005v.28003h48.27002v9.71997h14.79004v-24.42004l-53.66992,.03003v.00002Zm1.07007-94.17993V127.72202h.01978V34.75204h-.01978Zm0,0V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm35.54004,31.37988v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm9.65991,15.44995v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.87988-15.09009v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm0,0v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm-34.23022-25.96997v6.63h.02002v-6.63h-.02002Zm-1.30981-5.40991v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.01978,0h-.01978V127.72202h.01978V34.75204Zm-1.08984,94.17993v-44.57996h-2.67993v-3.75h2.67993v-30.74011l-2.87012-.02991v-3.56995h2.87012V18.50204h-.28003v27.47998h-2.86987v4.12988l2.86987,.02002v30.19006h-2.67993v4.30994h2.67993v44.58008l53.67017-.03003v23.86011h-14.23022v-9.72009h-48.55005v.28003h48.27002v9.71997h14.79004v-24.42004l-53.66992,.03003v.00002Zm1.07007-94.17993V127.72202h.01978V34.75204h-.01978Zm0,0V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm35.54004,31.37988v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm-46.30029,106.18005c-.07983,.0199-.17993,.03992-.25977,.05994v.29004c.08984-.02002,.17993-.04004,.25977-.06006h.02002v-.29993c-.00652-.00002-.01319,.00333-.02002,.01001Zm-.25977-21.53003v.28003h.27979v-.28003h-.27979Zm47.1599,20.54993l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm1.32007-80.80994c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm0,0v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm0,0v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm-28.03027-20.80994c-.22998-1.42004-.95996-2.72009-2.0498-3.67004-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995Zm-.47998-14.88c.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h.02002v-1.20007c0-1.13-.31006-2.20007-.8501-3.10999Zm-5.20996-3.08008v7.39014h.02002v-7.39014s-.02002,0-.02002,0Zm-.27979,6.41003v.70007h.01978v-.70007h-.01978Zm-.23022,6.39001v6.63h.02002v-6.63h-.02002Zm-1.30981-5.40991v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm-.43018-16.53003v15.54993h.02002v-15.54993h-.02002Zm-3.91992-2.22998v2.22998h.02002v-2.22998h-.02002Zm6.16992,18.55994v.20007h.02002v-.20007h-.02002Zm-.27979-.78003v.70007h.01978v-.70007h-.01978Zm-1.54004,.9801v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm-.15015-16.25v15.54993h.02002v-15.54993h-.02002Zm-3.91992-2.22998v2.22998h.02002v-2.22998h-.02002Zm6.18994,18.55994h-.02002v.20007h.02002v-.20007Zm-.28003-.78003h-.01978v.70007h.01978v-.70007Zm-1.53979,.9801h-.02002v12.03992h.02002v-12.03992Zm-.28027-.28003h-.01978V127.72202h.01978V34.75204Zm-.1499-16.25h-.02002v15.54993h.02002v-15.54993Zm-.93994,110.42994v-44.57996h-2.67993v-3.75h2.67993v-30.74011l-2.87012-.02991v-3.56995h2.87012V18.50204h-.28003v27.47998h-2.86987v4.12988l2.86987,.02002v30.19006h-2.67993v4.30994h2.67993v44.58008l53.67017-.03003v23.86011h-14.23022v-9.72009h-48.55005V15.99203h-.27979v127.60999h48.5498v9.71997h14.79004v-24.42004l-53.66992,.03003h.00002Zm-2.97998-112.65991h-.02002v2.22998h.02002v-2.22998Zm3.8999,2.22998v15.54993h.02002v-15.54993h-.02002Zm.15015,16.25V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm1.54004-.9801v.70007h.01978v-.70007h-.01978Zm.27979,.78003v.20007h.02002v-.20007h-.02002Zm23.52001,109.93005l-.01001,.23999c-.07983,1.27002-.52002,2.43994-1.21997,3.3999,.71997-.94995,1.16016-2.11987,1.23999-3.3999l.01001-.23999h-.02002ZM115.02002,16.27206v2.22998h.02002v-2.22998h-.02002Zm3.91992,2.22998v15.54993h.02002v-15.54993h-.02002Zm.15015,16.25V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm1.54004-.9801v.70007h.01978v-.70007h-.01978Zm23.7998,110.71008l-.01001,.23999c-.07983,1.27002-.52002,2.43994-1.21997,3.3999,.71997-.94995,1.16016-2.11987,1.23999-3.3999l.01001-.23999h-.02002ZM115.02002,14.18198v1.81006h.02002v-1.81006h-.02002Zm0,2.09009v2.22998h.02002v-2.22998h-.02002Zm39.89014,50.13989v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm-46.30029,106.18005c-.07983,.0199-.17993,.03992-.25977,.05994v.29004c.08984-.02002,.17993-.04004,.25977-.06006h.02002v-.29993c-.00651-.00002-.01318,.00333-.02002,.01001Zm-.25977-21.53003v.28003h.27979v-.28003h-.27979Zm36.35986-6.29993l-.01001,.23999c-.07983,1.27002-.52002,2.43994-1.21997,3.3999,.71997-.94995,1.16016-2.11987,1.23999-3.3999l.01001-.23999h-.02002Zm0,0l-.01001,.23999c-.07983,1.27002-.52002,2.43994-1.21997,3.3999,.71997-.94995,1.16016-2.11987,1.23999-3.3999l.01001-.23999h-.02002Zm0,0l-.01001,.23999c-.07983,1.27002-.52002,2.43994-1.21997,3.3999,.71997-.94995,1.16016-2.11987,1.23999-3.3999l.01001-.23999h-.02002Zm-36.35986-.29004v.29004h.27979v-.29004h-.27979Zm488.79005,202.89996v1.79004h.1499v-1.79004h-.1499Zm-400.66016,72.79004v.02997h15.41016v-.02997h-15.41016Zm5.52002-361.50006l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm-37.41992,25.96997v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.28003,90.10986l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm-.59985-105.19995v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm0,0v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm-34.23022-25.96997v6.63h.02002v-6.63h-.02002Zm-1.30981-5.40991v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.01978,0h-.01978V127.72202h.01978V34.75204Zm-1.08984,94.17993v-44.57996h-2.67993v-3.75h2.67993v-30.74011l-2.87012-.02991v-3.56995h2.87012V18.50204h-.28003v27.47998h-2.86987v4.12988l2.86987,.02002v30.19006h-2.67993v4.30994h2.67993v44.58008l53.67017-.03003v23.86011h-14.23022v-9.72009h-48.55005v.28003h48.27002v9.71997h14.79004v-24.42004l-53.66992,.03003v.00002Zm1.07007-94.17993V127.72202h.01978V34.75204h-.01978Zm0,0V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm35.54004,31.37988v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm17.70996,137.69995l-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002c-.04004,.0199-.11987,.05994-.23999,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995v-.30005l-1.70996,.6499Zm-61.49023,84.74011h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm31.10986,131.87v.02997h15.41016v-.02997h-15.41016Zm5.52002-361.50006l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm-37.41992,25.96997v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.28003,90.10986l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm-.59985-105.19995v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm0,0v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm-34.23022-25.96997v6.63h.02002v-6.63h-.02002Zm-1.30981-5.40991v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978Zm.01978,0h-.01978V127.72202h.01978V34.75204Zm-1.08984,94.17993v-44.57996h-2.67993v-3.75h2.67993v-30.74011l-2.87012-.02991v-3.56995h2.87012V18.50204h-.28003v27.47998h-2.86987v4.12988l2.86987,.02002v30.19006h-2.67993v4.30994h2.67993v44.58008l53.67017-.03003v23.86011h-14.23022v-9.72009h-48.55005v.28003h48.27002v9.71997h14.79004v-24.42004l-53.66992,.03003v.00002Zm1.07007-94.17993V127.72202h.01978V34.75204h-.01978Zm0,0V127.72202h.01978V34.75204h-.01978Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm35.54004,31.37988v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm17.70996,137.69995l-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002c-.04004,.0199-.11987,.05994-.23999,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995v-.30005l-1.70996,.6499Zm-61.49023,84.74011h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm31.10986,131.87v.02997h15.41016v-.02997h-15.41016Zm5.51001-364.27008v2h.26001v-2h-.26001Zm.01001,2.77002l-.02002,1.98999v.01001h.27002v-2h-.25Zm-37.42993,23.19995v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm.52002,97.41992l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm1.32007-80.80994c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm14.02002,108.47998l-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002c-.04004,.0199-.11987,.05994-.23999,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995v-.30005l-1.70996,.6499Zm-61.49023,84.74011h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm-9.86011-116.68011l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm9.06006-89.75v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.61011-21.43994v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm.07983,7.78003v9.43994h.1001l-.1001-9.43994Zm9.58008,7.66992v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm5.96997-13.77002v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm45.15991-34.91003v2h.26001v-2h-.26001Zm.01001,2.77002l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm.01001,2.77002l-.02002,1.98999v.01001h.27002v-2h-.25Zm-25.08984-31.30005c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm49.38013-6.69006c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm469.61008,313.32001v1.79004h.1499v-1.79004h-.1499Zm7.05981,65.41003v6.65997h.02002v-6.65997h-.02002Zm-5.61987,.64996v6.01001h.02002v-6.01001h-.02002Zm-7-3.78998v3.78998h.02002v-3.78998h-.02002Zm-2.91016-28.29999v3.77997h.02002v-3.77997h-.02002Zm-37.43994,28.29999v4h.02002v-4h-.02002Zm-226.06982,13.92999c-.08008-2.04999-.94019-3.95001-2.41016-5.38-.07007-.06-.12988-.12-.18994-.16998,.06006,.06,.10986,.10999,.16992,.16998,1.46997,1.42999,2.33008,3.33002,2.41016,5.38l.00977,.22003h.02002l-.00977-.22003Zm7.38989-7.58997v7.81h.02002v-7.81h-.02002Zm-7.38989,7.58997c-.08008-2.04999-.94019-3.95001-2.41016-5.38-.07007-.06-.12988-.12-.18994-.16998,.06006,.06,.10986,.10999,.16992,.16998,1.46997,1.42999,2.33008,3.33002,2.41016,5.38l.00977,.22003h.02002l-.00977-.22003Zm-8.05029-7.58997v7.81h.02002v-7.81h-.02002Zm-11.67993,2.25995c-.25-.25-.51001-.47998-.78979-.69,.27002,.22003,.52979,.45001,.77002,.69,1.41992,1.42999,2.21973,3.32001,2.25,5.32001v.23004h.01978v-.23004c-.03003-2-.82983-3.89001-2.25-5.32001Zm-30.32007,8.14001v3.22003h.02002v-3.22003h-.02002Zm-10.81982-12.10999v13.54999h.02002v-13.54999h-.02002Zm-38.37988,9.17999h-.02002c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19Zm-7.28027-.59003c.22021,.61005,.52002,1.19,.90015,1.70001-.36011-.51996-.65991-1.08997-.88013-1.70001h-.02002Zm-.43994,0c-.21997,.71002-.5498,1.36005-.96997,1.93005,.44019-.57001,.77002-1.22003,.98999-1.93005h-.02002Zm-21.70996-2.69995v.02997h15.41016v-.02997h-15.41016Zm5.51001-364.27008v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-1.13013,390.04004c-.21997,.71997-.58984,1.38995-1.05005,1.98999,.49023-.59003,.8501-1.27002,1.07007-1.98999h-.02002Zm-2.28003,3.20996c-.0498,.04004-.09985,.08002-.15991,.10999,.07007-.01996,.11987-.06,.17993-.10999,.11011-.07996,.22021-.16998,.32007-.26996-.11011,.08997-.21997,.17999-.34009,.26996Zm-2.25977-376.33997h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-2.44995,376.24006c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm1.54004-4.38v.42004c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002Zm-4.36987-1.33997v1.33997h.02002v-1.33997h-.02002Zm-5.90015-265.40997v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008h.02002v-.83008l-1.14014-1.13989Zm-1.28979,.96997h-.02002l1,1h.02002l-1-1Zm-6.59009-72.3501v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.09009,75.97998l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-11.89014l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-74.56006,89.53003h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm40.96997,248.55011v.02997h15.41016v-.02997h-15.41016Zm5.51001-364.27008v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-5.66992,16.91003h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-2.44995,376.24006c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm1.54004-4.38v.42004c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002Zm-4.36987-1.33997v1.33997h.02002v-1.33997h-.02002Zm-5.90015-265.40997v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008h.02002v-.83008l-1.14014-1.13989Zm-1.28979,.96997h-.02002l1,1h.02002l-1-1Zm-6.59009-72.3501v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.09009,75.97998l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-11.89014l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-74.56006,89.53003h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm9.06006-89.75v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.61011-21.43994v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm22-39.05005c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm42.73999,.21008v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm0,0v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm0,0v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm55.56006-15.76001v2.45996h.02002v-2.45996h-.02002Zm-.34009,14.22998v.32996h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38Zm2.02002-.48999v.65991h.02002v-.65991h-.02002Zm-49.04004-13.73999v16.60986h.02002V18.50204h-.02002Zm-1.55981,8.85986c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002v7.46997h.02002v-.27991h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm27.45996,40.14001v9.43994h.1001l-.1001-9.43994Zm9.58008,7.66992v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm26.54004-45.65991h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-19.05981,33.72998v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm28.31006-40.82996h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm18.36011,7.76001v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-5.66992,16.91003h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm18.36011,7.76001v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-5.66992,16.91003h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm50.18018-15.63989v.37988h.02002v-.37988h-.02002Zm-5.3501,.12988v.27002h.02002v-.27002h-.02002Zm-.28003,0v.27002h.02002v-.27002h-.02002Zm-.66992-.37988v.65991h.02002v-.65991h-.02002Zm13.83008,204.81994c-.23022,.52002-.56006,.98004-.96997,1.35999,.41992-.37,.75977-.82996,.98975-1.35999h-.01978Zm.41992-51.97998h.02002c.25-.56995,.61987-1.05994,1.07007-1.46008-.45996,.38013-.83008,.88013-1.09009,1.46008Zm-1.38989-1.35999c.40991,.38,.73975,.83997,.96997,1.35999h.01978c-.22998-.53003-.56982-.98999-.98975-1.35999Zm5.07983,36.70996v5.17993h.02002v-5.17993h-.02002Zm351.83008,126.94002v-.01001h-.13989v1.80005h.1499v-1.79004h-.01001Zm-28.18994-80.95996v2.06h.01978v-2.06h-.01978Zm9.88989-.24005v2.30005h.02002v-2.30005h-.02002Zm25.21997,146.61005v6.65997h.02002v-6.65997h-.02002Zm-5.61987,.64996v6.01001h.02002v-6.01001h-.02002Zm-7-3.78998v3.78998h.02002v-3.78998h-.02002Zm-259.03003,6.34003v7.81h.02002v-7.81h-.02002Zm-7.38989,7.58997c-.08008-2.04999-.94019-3.95001-2.41016-5.38-.07007-.06-.12988-.12-.18994-.16998,.06006,.06,.10986,.10999,.16992,.16998,1.46997,1.42999,2.33008,3.33002,2.41016,5.38l.00977,.22003h.02002l-.00977-.22003Zm-8.05029-7.58997v7.81h.02002v-7.81h-.02002Zm-11.67993,2.25995c-.25-.25-.51001-.47998-.78979-.69,.27002,.22003,.52979,.45001,.77002,.69,1.41992,1.42999,2.21973,3.32001,2.25,5.32001v.23004h.01978v-.23004c-.03003-2-.82983-3.89001-2.25-5.32001Zm-5.63989-1.19v6.74005h.02002v-6.74005h-.02002Zm0,7.02002v1.51001h.02002v-1.51001h-.02002Zm-5.71997-2.88v2.60004h.02002v-2.60004h-.02002Zm-18.96021,5.19v3.22003h.02002v-3.22003h-.02002Zm-10.81982-12.10999v13.54999h.02002v-13.54999h-.02002Zm-38.37988,9.17999h-.02002c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19Zm-7.28027-.59003c.22021,.61005,.52002,1.19,.90015,1.70001-.36011-.51996-.65991-1.08997-.88013-1.70001h-.02002Zm-.43994,0c-.21997,.71002-.5498,1.36005-.96997,1.93005,.44019-.57001,.77002-1.22003,.98999-1.93005h-.02002Zm-21.70996-2.69995v.02997h15.41016v-.02997h-15.41016Zm5.51001-364.27008v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-1.13013,390.04004c-.21997,.71997-.58984,1.38995-1.05005,1.98999,.49023-.59003,.8501-1.27002,1.07007-1.98999h-.02002Zm-2.28003,3.20996c-.0498,.04004-.09985,.08002-.15991,.10999,.07007-.01996,.11987-.06,.17993-.10999,.11011-.07996,.22021-.16998,.32007-.26996-.11011,.08997-.21997,.17999-.34009,.26996Zm-2.25977-376.33997h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-2.44995,376.24006c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm1.54004-4.38v.42004c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002Zm-4.36987-1.33997v1.33997h.02002v-1.33997h-.02002Zm-5.90015-265.40997v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008h.02002v-.83008l-1.14014-1.13989Zm-1.28979,.96997h-.02002l1,1h.02002l-1-1Zm-6.59009-72.3501v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.68994-29.21997v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm.59985,105.19995l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-9.03003v-5.40991h-.01001v-.28003l.01001-5.96997v-3.85999l-.28003,4.14001v5.68994h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-54.48999-32.46008l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v5.40991h-2.58008Zm-20.07007,121.99011h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm40.96997,248.55011v.02997h15.41016v-.02997h-15.41016Zm5.51001-364.27008v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-5.66992,16.91003h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-2.44995,376.24006c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm1.54004-4.38v.42004c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002Zm-4.36987-1.33997v1.33997h.02002v-1.33997h-.02002Zm-5.90015-265.40997v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008h.02002v-.83008l-1.14014-1.13989Zm-1.28979,.96997h-.02002l1,1h.02002l-1-1Zm-6.59009-72.3501v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.68994-29.21997v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm.59985,105.19995l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-11.89014l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-74.56006,89.53003h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm9.06006-89.75v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.68994-29.21997v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm.07983,7.78003v9.43994h.1001l-.1001-9.43994Zm21.92017-46.83008c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm42.73999,.21008v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008-6.62012v7.19006h.02002v-7.19006h-.02002Zm49.08008,6.62012v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008-6.62012v7.19006h.02002v-7.19006h-.02002Zm49.08008,6.62012v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008-6.62012v7.19006h.02002v-7.19006h-.02002Zm104.64014-9.13989v2.45996h.02002v-2.45996h-.02002Zm-.34009,14.22998v.32996h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38Zm-47.02002-14.22998v16.60986h.02002V18.50204h-.02002v-.00003Zm-51.59009,27.09998c-.22998-1.42004-.95996-2.72009-2.0498-3.67004-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995Zm50.03027-18.24011c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h43.06005v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002v7.46997h.02002v-.27991h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm-6.8501,6.39001v6.63h.02002v-6.63h-.02002Zm104.81006-7.70996v.32996h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38Zm-41.86011,15.3999c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-5.15991-29.62988v16.60986h.02002V18.50204h-.02002v-.00003Zm-52.07007,12.21997c.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h.02002v-1.20007c0-1.13-.31006-2.20007-.8501-3.10999Zm.47998,14.88c-.22998-1.42004-.95996-2.72009-2.0498-3.67004-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995Zm-6.19995-5.16003v6.63h.02002v-6.63h-.02002Zm106.83008-8.19995v.65991h.02002v-.65991h-.02002Zm.94995,.37988v.27002h.02002v-.27002h-.02002Zm-.28003,0v.27002h.02002v-.27002h-.02002Zm-26.18994,23.27002v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-5.66992,16.91003h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-62.94995-7.68994v6.63h.02002v-6.63h-.02002Zm34.31006,33.75v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001h21.57007v.00002Zm9.65991,15.44995v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.68994-29.21997v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm30.22998-16.43994h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-19.05981,33.72998v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.91992-24.39001v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm47.07983-10.52002v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-5.66992,16.91003h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm42.28027,375.32006h-.02002c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19Zm15.84985-238.37h.02002c.25-.56995,.61987-1.05994,1.07007-1.46008-.45996,.38013-.83008,.88013-1.09009,1.46008Zm-1.38989-1.35999c.40991,.38,.73975,.83997,.96997,1.35999h.01978c-.22998-.53003-.56982-.98999-.98975-1.35999Zm.96997,53.33997c-.23022,.52002-.56006,.98004-.96997,1.35999,.41992-.37,.75977-.82996,.98975-1.35999h-.01978Zm4.10986-16.63v5.17993h.02002v-5.17993h-.02002Zm351.83008,126.94v-.01001h-.13989v1.80005h.1499v-1.79004h-.01001Zm-18.30005-81.20001v2.30005h.02002v-2.30005h-.02002Zm-9.88989,.24005v2.06h.01978v-2.06h-.01978Zm9.88989-.24005v2.30005h.02002v-2.30005h-.02002Zm25.21997,146.61005v6.65997h.02002v-6.65997h-.02002Zm-5.61987,6.65997h.02002v-6.01001h-.02002v6.01001Zm-7-6.01001h.02002v-3.78998h-.02002v3.78998Zm-259.03003,2.55005v7.81h.02002v-7.81h-.02002Zm-9.80005,2.20996c-.07007-.06-.12988-.12-.18994-.16998,.06006,.06,.10986,.10999,.16992,.16998,1.46997,1.42999,2.33008,3.33002,2.41016,5.38l.00977,.22003h.02002l-.00977-.22003c-.08008-2.04999-.94019-3.95001-2.41016-5.38Zm-5.64014,5.60004h.02002v-7.81h-.02002v7.81Zm-12.46973-6.24005c.27002,.22003,.52979,.45001,.77002,.69,1.41992,1.42999,2.21973,3.32001,2.25,5.32001v.23004h.01978v-.23004c-.03003-2-.82983-3.89001-2.25-5.32001-.25-.25-.51001-.47998-.78979-.69Zm-4.8501,6.24005h.02002v-6.74005h-.02002v6.74005Zm0,1.78998h.02002v-1.51001h-.02002v1.51001Zm-5.71997-1.78998h.02002v-2.60004h-.02002v2.60004Zm-7.48999-9.69v.16998h.2998v-.16998h-.2998Zm-1.83008,.16998h.30005v-.16998h-.30005v.16998Zm-1.82007,0h.30005v-.16998h-.30005v.16998Zm-1.78979,0h.2998v-.10999h-.2998v.10999Zm-1.9502,0h.30005v-.10999h-.30005v.10999Zm-1.7998,0h.2998v-.41003h-.2998v.41003Zm-11.93018,0h.30005v-.64001h-.30005v.64001Zm-1.41992,0h.25v13.54999h.02002v-15.54999h-.27002v2Zm11.06982,12.10999v3.22003h.02002v-3.22003h-.02002Zm-10.81982-12.10999v13.54999h.02002v-13.54999h-.02002Zm-38.3999,9.17999c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19h-.02002Zm-7.26025-.59003c.22021,.61005,.52002,1.19,.90015,1.70001-.36011-.51996-.65991-1.08997-.88013-1.70001h-.02002Zm-1.40991,1.93005c.44019-.57001,.77002-1.22003,.98999-1.93005h-.02002c-.21997,.71002-.5498,1.36005-.96997,1.93005Zm-20.73999-4.60004h15.41016v-.02997h-15.41016v.02997Zm5.77002-364.30005h-.26001v2h.26001v-2Zm0,2.76001h-.26001l-.01001,2v.01001h.27002v-2.01001Zm-11.43994-12.82996h.02002v-12.76001h-.02002v12.76001Zm-2.18018,379.27002c.49023-.59003,.8501-1.27002,1.07007-1.98999h-.02002c-.21997,.71997-.58984,1.38995-1.05005,1.98999Zm-1.38989,1.32996c.07007-.01996,.11987-.06,.17993-.10999,.11011-.07996,.22021-.16998,.32007-.26996-.11011,.08997-.21997,.17999-.34009,.26996-.0498,.04004-.09985,.08002-.15991,.10999Zm-2.07983-376.44995c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002h.02002Zm-.44019,.01001c-.25-.68005-.61987-1.31006-1.09009-1.8501,.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002Zm-2,370.42999c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002v.42004Zm-4.36987-.42004h.02002v-1.33997h-.02002v1.33997Zm-4.78003-264.77997h.02002v-.83008l-1.14014-1.13989v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008Zm-1.40991,0l-1-1h-.02002l1,1h.02002Zm-7.31006-71.70996v-1.64014h-.28003v1.64014h.28003Zm-4.93018-2h-.12988v2h.12988v-2Zm-4.92993-7.31006v9.43994h.1001l-.1001-9.43994Zm-2.27002,10.93994h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991,0,0,0-.1001,0-.10009Zm6.73999,10.79004h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002Zm-16.61987,25.19995s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001h21.57007v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33986Zm40.63989,66.62012c-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-9.03003v-5.40991l-.28003,3.37v2.03992h-2.58008l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.02979-.02002,.03979-.02002l.04004-.02002h16.63988l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002c-.04004,.0199-.11987,.05994-.23999,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998c0-.03992-.17993-4.77991-2.20996-11.57996Zm-72.3501,101.10999h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm4.51978,221.79999c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm15.30005-4.20996v.02997h15.41016v-.02997h-15.41016Zm5.77002-364.27008h-.26001v2h.26001v-2Zm0,2.76001h-.26001l-.01001,2v.01001h.27002v-2.01001Zm-11.43994-12.82996h.02002v-12.76001h-.02002v12.76001Zm-5.6499,4.15002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002h.02002Zm-.44019,.01001c-.25-.68005-.61987-1.31006-1.09009-1.8501,.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002Zm-2,370.43c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002v.42004Zm-.66992,2.71997c-.23999,.45001-.53003,.87-.87012,1.23999,.3501-.37,.64014-.78998,.87012-1.23999Zm-3.69995-3.14001h.02002v-1.33997h-.02002v1.33997Zm-4.78003-264.77997h.02002v-.83008l-1.14014-1.13989v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008Zm-1.40991,0l-1-1h-.02002l1,1h.02002Zm-7.31006-71.70996v-1.64014h-.28003v1.64014h.28003Zm-4.93018-2h-.12988v2h.12988v-2Zm-4.92993-7.31006v9.43994h.1001l-.1001-9.43994Zm-2.27002,10.93994h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991,0,0,0-.1001,0-.10009Zm6.73999,10.79004h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002Zm-16.61987,25.19995s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001h21.57007v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33986Zm40.63989,66.62012c-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-11.89014l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.02979-.02002,.03979-.02002l.04004-.02002h16.63988l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002c-.04004,.0199-.11987,.05994-.23999,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998c0-.03992-.17993-4.77991-2.20996-11.57996Zm-72.3501,101.10999h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm9.34009-88.10986v-1.64014h-.28003v1.64014h.28003Zm-4.93018-2h-.12988v2h.12988v-2Zm-4.92993-7.31006v9.43994h.1001l-.1001-9.43994Zm-2.27002,10.93994h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991,0,0,0-.1001,0-.10009Zm5.88013,10.5v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-15.76001,25.48999s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001h21.57007v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33986Zm12.1499-46.92993v9.43994h.1001l-.1001-9.43994Zm21.92017-46.83008c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm42.73999,.21008v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008,.56995h.02002v-7.19006h-.02002v7.19006Zm49.08008-.56995v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008,.56995h.02002v-7.19006h-.02002v7.19006Zm49.08008-.56995v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008,.56995h.02002v-7.19006h-.02002v7.19006Zm104.64014-16.32996v2.45996h.02002v-2.45996h-.02002Zm-.34009,14.55994h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38v.32996Zm-47.02002,2.04993h.02002V18.50204h-.02002v16.60981Zm-53.63989,6.82007c-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995c-.22998-1.42004-.95996-2.72009-2.0498-3.67004Zm47.43994-12.77002c-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.94995v-7.19006h.02002l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h.02002v-.20007h43.02001v-.56995c0-1.42004,.44995-2.73999,1.22998-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002v7.46997h.02002v-.27991h.28003v-7.47009h-.13989c-1.72021,0-3.36011,.64014-4.64014,1.80005v.00002Zm-2.26001,5.59009h-42.47998v-.70007h42.47998v.70007Zm-49.33008,12.31995h.02002v-6.63h-.02002v6.63Zm104.81006-14.33997v.32996h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38Zm-40.79004,17.25h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501,.4502,.54004,.82007,1.17004,1.07007,1.8501Zm-6.22998-14.87012h.02002V18.50204h-.02002v16.6098Zm-51.23999-1.27991v1.20007h.02002v-1.20007c0-1.13-.31006-2.20007-.8501-3.10999,.52002,.91992,.83008,1.97998,.83008,3.10999Zm-2.3999,8.09998c-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995c-.22998-1.42004-.95996-2.72009-2.0498-3.67004Zm-4.15015,5.14001h.02002v-6.63h-.02002v6.63Zm106.83008-14.82996v.65991h.02002v-.65991h-.02002Zm.94995,.37988v.27002h.02002v-.27002h-.02002Zm-.28003,0v.27002h.02002v-.27002h-.02002Zm-26.18994,23.27002v2h.26001v-2h-.26001Zm-.01001,4.76001v.01001h.27002v-2.01001h-.26001l-.01001,2Zm-11.16992-14.82996h.02002v-12.76001h-.02002v12.76001Zm-5.6499,4.15002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002h.02002Zm-.46021,.01001h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501,.4502,.54004,.82007,1.17004,1.07007,1.8501Zm.44019-.01001h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-.44019,.01001h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501,.4502,.54004,.82007,1.17004,1.07007,1.8501Zm-64.02002-9.54004v6.63h.02002v-6.63h-.02002Zm34.31006,33.75v9.43994h.1001l-.1001-9.43994Zm-21.69995-8.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001h21.57007v-.28003h-14.99023l-6.62988,.03003v.00002Zm31.56006,17.34009v-1.64014h-.28003v1.64014h.28003Zm-4.93018-2h-.12988v2h.12988v-2Zm-4.92993-7.31006v9.43994h.1001l-.1001-9.43994Zm-2.27002,10.93994h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.10009Zm5.88013,10.5v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.0901h-11.27002Zm-15.76001,25.49s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001h21.57007v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33985Zm42.30005-71.1499h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-.44019,.01001h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501,.4502,.54004,.82007,1.17004,1.07007,1.8501Zm-20.12988,31.87988v1.64014h.28003v-1.64014h-.28003Zm-4.78003,1.64014h.12988v-2h-.12988v2Zm-4.80005-9.31006v9.43994h.1001l-.1001-9.43994Zm1.38013,16.41003c-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12-.15015-.05994-.30005-.12-.45996-.19994Zm-23.03003-24.19006h21.57007v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499s0-53.26001,0-53.26Zm68.6499-10.52002v2h.26001v-2h-.26001Zm-.01001,4.76001v.01001h.27002v-2.01001h-.26001l-.01001,2Zm-11.16992-14.82996h.02002v-12.76001h-.02002v12.76001Zm-5.6499,4.15002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002h.02002Zm-.46021,.01001h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501,.4502,.54004,.82007,1.17004,1.07007,1.8501Zm41.21021,373.46998h-.02002c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19Zm15.84985-238.37h.02002c.25-.56995,.61987-1.05994,1.07007-1.46008-.45996,.38013-.83008,.88013-1.09009,1.46008Zm-.41992,0h.01978c-.22998-.53003-.56982-.98999-.98975-1.35999,.40991,.38,.73975,.83997,.96997,1.35999Zm0,51.97998c-.23022,.52002-.56006,.98004-.96997,1.35999,.41992-.37,.75977-.82996,.98975-1.35999h-.01978Zm4.10986-16.63v5.17993h.02002v-5.17993h-.02002Zm351.83008,126.94v-.01001h-.13989v1.80005h.1499v-1.79004h-.01001Zm-18.30005-78.89996h.02002v-2.30005h-.02002v2.30005Zm-9.88989-2.06v2.06h.01978v-2.06h-.01978Zm9.88989-.24005v2.30005h.02002v-2.30005h-.02002Zm55.59009,153.02002h-.02002v-17.14996h-21.76001v.27997h6.06006v.32001c0,2.75-1.78003,5.10999-4.25,5.96002-.18994,.06-.38013,.12-.58008,.16998-.18994,.03998-.39014,.08002-.59009,.10999-.19995,.02002-.40991,.03998-.61987,.04999h-.02002v.71002h-.01001v3.14001h-8.58008v6.65997h-5.59985v-6.01001h-7v-3.78998h-1.14014v-28.07001h.02002l.18994-.02997c.49023-.07001,.97998-.17004,1.43994-.32001,1.41016-.45001,2.69019-1.26001,3.7002-2.36005,1.35986-1.47998,2.15991-3.38995,2.23999-5.38995l.01001-.23004h2.60986V235.952h-2.15991v1.33002h-34.79004v22.89996h21.44995l-.00977,.25c-.14014,2.62-1.91016,4.77002-4.30029,5.48999-.5498,.16003-1.13989,.25-1.73975,.25h-.14014v2.30005h-9.87012v-2.06h-5.0498v57.62h-.13013v4.84998h.13013v44.75h1.54004v-6.13h8.07983v6.13h1.56006v-7.28998l.22998,.01996c.62012,.04004,1.21997,.17004,1.77002,.37006,2.42017,.87994,4.13989,3.20996,4.13989,5.89996v.60999h16.40015l-.01001,.25c-.16016,3.44-2.3999,6.30005-5.46997,7.38-.48999,.17004-1.01001,.29999-1.53003,.38-.12988,.02002-.26001,.04004-.37988,.04999h-.02002c-.13013,.01001-.26025,.02002-.39014,.03003-.13989,.01001-.29004,.01001-.42993,.01001h-.88013v3.77997h-20.56006v-2.42999h-4.0498v22.52002h.2998v-22.23999h.9502l.01001,19.04999h1.78979v-15.45001h-1.50977v-3.59998h2.22998v2.42999h21.13989v-3.78003h.6001c.07983,0,.15991,0,.23999-.01001,.0498,0,.1001,0,.1499-.00995l.23999-.01001v28.04999h-1.18994v-6.60999h-23.68994v2.17999h.28003v-1.90002h23.12988v6.33002h-1.29004l.01001,2.51001h-21.84985v-1.02002h-.28003v1.29999h22.12988v1h-22.12988v12.92004h-1.15015v-12.67004h-1.00977v-2.54999h-.31006v2.83002h1.04004v15.13h-35.1001v-2.71002h-2.59009v-12.73999h25.05005v-4h-26.65991v14.41998h-183.90015v-.22998c-.04004-2.09998-.87988-4.08002-2.37988-5.56-.9502-.92999-2.09009-1.60004-3.32007-1.96002-.73999-.21997-1.51001-.32996-2.30005-.32996h-.13989v7.81h-7.38013l-.00977-.22003c-.08008-2.04999-.94019-3.95001-2.41016-5.38-.07007-.06-.12988-.12-.18994-.16998h-.01001c-.05005-.07001-.11011-.12-.17993-.16998l-.01025-.01001c-.0065,.00665-.00977,.00665-.00977,0-.26001-.22003-.54004-.42004-.82007-.60999h-.01001c-.14014-.10004-.28003-.18005-.42993-.26001-.34009-.19-.69995-.36005-1.07007-.48999-.12988-.05005-.27002-.10004-.3999-.14001-.04004-.01001-.08008-.03003-.13013-.04004-.04004-.00995-.07983-.01996-.11987-.02997-.00684-.00665-.01352-.01001-.02002-.01001-.02002,0-.04004-.01001-.06006-.01001-.16992-.04999-.34009-.08997-.51001-.13-.5-.08997-1.01001-.13995-1.53003-.13995h-.14014v7.81h-9.42993v-.23004c-.03003-2-.82983-3.89001-2.25-5.32001-.25-.25-.51001-.47998-.78979-.69h-.01025c-.12988-.10999-.27002-.20996-.41992-.29999-.13989-.08997-.29004-.17999-.43994-.26996h-.01001c-.03003-.02002-.07007-.04004-.11011-.06006-.15991-.08997-.32983-.17999-.5-.25-.15991-.07996-.33984-.15997-.50977-.20996-.01025-.01001-.01025-.02002-.02002-.01001-.1001-.04999-.20996-.08002-.32007-.12-.01001,0-.02002-.01001-.04004-.01001-.07007-.02002-.13989-.03998-.20996-.06-.63013-.17999-1.28003-.27997-1.94019-.29999h-.27979l.08008-.29004c.11987-.42999,.17993-.84998,.17993-1.26996v-.14001h-5.73022v-4.42999h-30.34985v9.41998h-.90015c-.55981,0-1.08984-.08002-1.59985-.25-2.20996-.67999-3.82007-2.75-3.82007-5.19v-.14001h-.01001v-1.47998h-1.3999v-1.77997h-20.52002v-126.67999h-3.17993v.00995h-3.76001l.01001-.25c.13989-2.38995,1.72998-4.35999,3.88989-5.07996,.48999-.17004,1.01001-.27002,1.55005-.29004h.02002v-.28998h-.02002c-.55005-.02002-1.08008-.12-1.59009-.28998-.67993-.23004-1.30981-.59003-1.85986-1.03003-1.21997-1.01001-2.03003-2.51001-2.14014-4.20001l-.01978-.25h6.65991c.09009,0,.17993-.01996,.26001-.04999,.23999-.09003,.41992-.33002,.41992-.60999v-5.20001c0-.28003-.17993-.52002-.41992-.60999-.04004-.01001-.07007-.02002-.11011-.04004-.05005,0-.09985-.00995-.1499-.00995h-6.44995v-.24005c.04004-1.45996,.62988-2.81995,1.65991-3.82996,.63013-.62,1.38013-1.07001,2.18994-1.33002,.48999-.15997,.98999-.25,1.51001-.26001h.02002l.01001-.28998h-.02002c-.54004-.03003-1.07007-.13-1.56006-.32001-2.15991-.77002-3.69995-2.84003-3.69995-5.23999v-.23999l6.45996,.06h.02002v-.28003h-.02002l-6.45996-.06,.01001-.26001c.01001-1.5,.61011-2.89996,1.67993-3.95001,.63013-.62,1.38013-1.06995,2.2002-1.32996,.48975-.16003,1-.25,1.52002-.27002h.02002v-.28003h-.17017c-.52002,0-1.03003-.07996-1.51001-.21997-.02002,0-.04004-.01001-.06982-.02002-2.07007-.64996-3.62012-2.51001-3.79004-4.76996l-.01025-.25h8.79004v-2.61005l.19019-.01996c.37988-.03003,.76001-.11005,1.10986-.23999,.03003-.01001,.05005-.02002,.08008-.03003,.05005-.02002,.09985-.03998,.1499-.07001,.14014-.04999,.27002-.12,.39014-.19,.09985-.04999,.18994-.10999,.28979-.16998,.18018-.13,.3501-.27002,.51025-.41003,.41992-.37,.75977-.82996,.98975-1.35999h.40015c.45996,1.02002,1.29004,1.79999,2.29004,2.19,.02002,.01001,.04004,.02002,.07007,.03003,.08984,.03998,.18994,.07001,.29004,.09998,.37988,.12,.76978,.17999,1.17993,.17999h.15991v-3.79999h1.23999v-15.33002h-1.54004v5.17993h-7.82007v-29.07983h7.82007v5.17993h1.52002v-15.33008h-1.23999v-3.79993h-.13989c-.41016,0-.80005,.05994-1.17993,.18005-.16016,.04993-.32007,.09985-.47021,.16992-.11987,.05005-.22998,.11011-.33984,.17004-.22998,.13-.4502,.2699-.65015,.43005-.03003,.02991-.07007,.05994-.09985,.08984-.45996,.38013-.83008,.88013-1.09009,1.46008l-.19995,.62-.2002-.62c-.22998-.53003-.56982-.98999-.98975-1.35999-.03003-.05005-.07007-.08008-.11011-.1001-.11987-.09985-.26001-.20996-.40015-.30994h-.00977c-.09009-.05994-.18994-.12-.28003-.17004-.15015-.08997-.31006-.16992-.47998-.22998-.02002-.02002-.05005-.03003-.08008-.04004h-.01001c-.02002-.01001-.03003-.01001-.05005-.0199-.34985-.13-.72998-.21008-1.10986-.24011l-.19019-.0199h-.02002v-3.03003h-8.78979l.01001-.25c.1499-2.32996,1.72998-4.26001,3.83984-4.94006,.47998-.16992,.98999-.26001,1.51001-.27991v-.29993c-.53979-.02002-1.07007-.12012-1.55981-.30005-.51025-.17004-.97998-.41003-1.41016-.71997-1.41992-.98999-2.35986-2.64014-2.38989-4.5v-.23999h6.51978v-.28003h-6.51978v-.22998c.01001-2.38013,1.55005-4.41016,3.68994-5.13013,.47998-.17993,1-.28003,1.53003-.29993v-.29993c-.53003-.02002-1.05005-.12012-1.53003-.30005-.04004,0-.08008-.02002-.11011-.04004-.61987-.20996-1.17993-.55005-1.66992-.96997-1.15991-.98999-1.8999-2.46997-1.90991-4.12012v-.22998h6.47998c.09009,0,.17993-.02002,.26001-.04993,.22998-.09998,.3999-.33997,.3999-.60999v-5.19995c0-.28003-.16992-.51001-.3999-.61011-.04004-.01001-.07007-.02002-.11011-.04004-.05005,0-.09985-.01001-.1499-.01001h-6.47998v-.23999c.03979-2.44995,1.65991-4.54993,3.86987-5.29993,.51001-.18005,1.04004-.27991,1.59009-.29993v-.28003c-.53003,0-1.04004-.08008-1.53003-.23999-2.14014-.63013-3.76001-2.55005-3.91992-4.87012l-.01001-.25h7.13989V43.05197h7.11011v-.14001c0-1.98999-.73999-3.87988-2.09009-5.33997-1-1.08997-2.27002-1.85999-3.66992-2.25-.47021-.13-.9502-.21997-1.43994-.26001l-.2002-.0199h-.02002v-2.06006c0-.19995-.11987-.38-.2998-.44995l-.09009-.03003c-.03003-.01001-.07007-.01001-.1001-.01001h-1.36987v.37988l-5.30005,.02002h-.03003v-.27002h-.29004l.27002-.46997c0-.08997,.01001-.17993,.02002-.27002,0-.08984,.02002-.17993,.03003-.27002,.30005-2.17993,1.86011-3.94995,3.91992-4.59985,.46997-.15015,.96997-.23999,1.48022-.26001l-.03027-.29004c-.53979-.02002-1.05981-.12-1.55981-.29004-.84009-.28003-1.59009-.75-2.19995-1.35999-.97998-.96997-1.6001-2.28992-1.66016-3.76001v-.60999h.02002l5.61011,.04004h1.28003v-1.97998h245.00977v-4.32007h7.76025v-.28003H225.57007v-3.81995h-35.26001v3.81995H108.60986v.28003h6.41016v1.81006h-6.41016v.28003h6.41016v2.22998h3.91992v15.54993h1.97021v.70007h-1.82007V127.72202h53.33984v25.52001l1.14014,1.13989v.83008h-1.40991l-1-1h-14.91016v-9.73999h-47.64014v.29004h36.1001l-.01001,.23999c-.07983,1.27002-.52002,2.43994-1.21997,3.3999-.1001,.14014-.20996,.27002-.31982,.40002-.13013,.15002-.26025,.29004-.40015,.43005-.19995,.20996-.40991,.38989-.63989,.55005-.33008,.26001-.7002,.47998-1.09009,.65991-.29004,.14001-.59009,.26001-.90991,.3501-.59009,.17993-1.2002,.2699-1.84009,.2699h-29.67017v.28003h20.44019v4.14001h4.70996v5.68994h-3.30005c-.08008,0-.15991,.01001-.22998,.03003-.26001,.05005-.47998,.18994-.62988,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.63989l-.09009,.03003h-.02002c-.02979,.01001-.09985,.05005-.20996,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009-.00652-.00002-.01319,.00333-.02002,.01001v.28992h.02002c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01334-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004h-.02002v.29004h.02002l.21997-.05005v112.97998H30.62012v38.56H15.84009l-1.17993,17.94h13.59985l-2.66992,44.41998h62v28.02002h41v14.27002h49.63989v-5.28003h.02002l.1499-.04999h.02002c.06006-.02002,.12012-.03998,.18018-.06,.00977,0,.02002-.01001,.02979-.01001,.08008-.01996,.16016-.04999,.24023-.08002,.13989-.04999,.29004-.10999,.41992-.16998,.26001-.12,.51001-.26001,.75-.40997,.01001-.01001,.03003-.02002,.05005-.03003,.19995-.13,.3999-.27997,.57983-.44,.04004-.03998,.08008-.07001,.12012-.12,.12012-.09998,.23999-.21997,.35986-.34998,.01025-.01001,.02002-.02002,.03003-.03003,.3501-.37,.64014-.78998,.87012-1.23999,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-4.36987v-1.33997h5.06982v8.92999h.14014c.65991,0,1.2998-.09998,1.91992-.28998,.03003-.01001,.06006-.02002,.1001-.03003,.04004-.02002,.07983-.02997,.11987-.03998,.22998-.09003,.46997-.19,.69019-.30005,.1499-.06995,.28979-.14996,.42993-.22998,.12988-.07001,.26001-.15997,.38989-.26001h.01001v-.01001c.07007-.01996,.11987-.06,.17993-.10999,.11011-.07996,.22021-.16998,.32007-.26996,.11011-.10004,.21997-.20001,.33008-.30005,.05005-.04999,.09985-.09998,.13989-.14996,.1001-.10999,.2002-.22003,.30005-.34003,.04004-.04999,.09009-.09998,.11987-.15997,.49023-.59003,.8501-1.27002,1.07007-1.98999l.42017-.02002c.57983,1.53998,1.67993,2.79999,3.05981,3.58002,.39014,.22998,.81006,.41998,1.23999,.56,.04004,.01001,.08008,.01996,.12012,.03998,.03003,.01001,.06006,.02002,.08984,.03003,.01025,0,.02002,0,.03027,.00995h.01978c.02002,.01001,.04004,.01001,.06006,.02002,.42993,.12,.88989,.21002,1.34009,.23999,.17993,.01001,.34985,.02002,.52002,.02002h.13989v-7.14001h14.8501v7.14001h.13989c.66992,0,1.32007-.09998,1.93018-.28003,.00977,0,.01978,0,.02979-.00995,.06006-.01001,.12012-.03003,.16992-.05005,.02002-.00995,.04004-.00995,.06006-.01996,.12012-.04004,.24023-.08002,.36011-.13,.22998-.09003,.44995-.20001,.66992-.31,.07007-.04004,.13013-.08002,.19995-.12,.16016-.09003,.32007-.19,.47021-.30005,.13989-.09998,.27979-.19995,.40991-.31,.04004-.02997,.07983-.06995,.13013-.09998h.00977c.1001-.08002,.18994-.16998,.28003-.26001,.01001,0,.01001-.01001,.02002-.02002,.01001-.00995,.02002-.01996,.03003-.02997,.1001-.09003,.18994-.19,.28003-.28998v-.01001c.02002-.02002,.04004-.04999,.07007-.08002,.06006-.07001,.11987-.14001,.18994-.21997v-.01001c.06006-.07001,.12012-.14001,.15991-.22003,.01001,0,.01001-.01001,.02002-.01996,.44019-.57001,.77002-1.22003,.98999-1.93005h.41992c.22021,.61005,.52002,1.19,.90015,1.70001,.07007,.09003,.13989,.17999,.20996,.26001,.04004,.06,.08008,.12,.13013,.16998,.00977,.03003,.02979,.05005,.05981,.07001,.02002,.04004,.05005,.07001,.08008,.10004,.04004,.04999,.08008,.09998,.11987,.13995,.11011,.12,.21021,.23004,.33008,.33002l.01001,.01001c.11011,.10999,.21997,.21002,.34009,.29999,.04004,.03003,.06982,.06,.10986,.09003,.07007,.06,.15015,.12,.22021,.17999h.00977c.36011,.26001,.74023,.48999,1.14014,.67999,.02002,.01001,.04004,.02002,.06006,.02997,.11987,.05005,.25,.11005,.37988,.17004,.12012,.03998,.23999,.07996,.37012,.13,0,.00665,.00325,.00665,.00977,0,.02002,.01001,.04004,.01001,.06006,.01996,.06006,.02002,.11011,.04004,.17017,.05005,.01978,.00995,.03979,.01996,.07007,.01996,.07983,.03003,.16992,.04999,.25977,.08002,.36011,.08002,.72998,.14001,1.1001,.16998,.17993,.01001,.35986,.02002,.54004,.02002h.13989v-5.13l.44019,1c.27002,.45001,.58984,.85999,.95996,1.19,0,0,.00977,0,.00977,.01001,.18018,.15997,.36011,.31,.56006,.45996h.01001c.02002,.02002,.05005,.03003,.07007,.05005h.01001c.07007,.04999,.13989,.09998,.21997,.14996,.04004,.02002,.07007,.04004,.1001,.04999,.06982,.05005,.1499,.09003,.22998,.13,.02002,0,.04004,.01001,.06982,.03003,.08008,.02997,.16016,.07001,.25,.10999,.06006,.02002,.13013,.04999,.21021,.08002,.01978,.01001,.05005,.02002,.08984,.02997,.09009,.03003,.19019,.06,.29004,.09003,.42993,.12,.87012,.17999,1.33008,.17999h.18994v5.41998h388.22998v-4.58997h-.98999v-7.39001h.02002l.25,.03998c1.09009,.17004,4,.61005,8.48999,1.16003,.36987,.04999,.73999,.08997,1.13013,.14001,7.50977,.90997,18.94995,2.08997,33.43994,2.96997h.1001l.19971-.47998-.26978-.03003h-.02002l-.09009,.22003-.16992-.01001c-12.48999-.76001-22.72998-1.75-30.09009-2.58002-.48999-.06-.95996-.12-1.41992-.16998-7.45996-.88-11.6001-1.54999-11.69019-1.56l-.13989-.03003h-.02002v8h.98999v4.03003H275.12988v-1.27002h17.57007v-8.92999l.17993-.03003c.2002-.03998,.42017-.07996,.62012-.12l.27002-.06995h.02002c.05005-.01001,.1001-.03003,.1499-.04004,.26001-.07001,.51001-.14996,.75-.22998,.52002-.17999,1.02002-.39001,1.47998-.64001,.22021-.12,.43994-.23999,.64014-.37,1.1001-.66998,1.97998-1.53003,2.56006-2.52002l.41992,.12v6.74005h-5.69995v-2.60004h-.25l-.03003-.23999v.15997l-.02002-.15997v3.12h6v1.51001h-6v4.46997h46.8999v-5.70996h184.20996v-10.70001h1v13.02002h2.59009v2.70996h35.38013v.84003h4.30981v-.84003h44.66016v-2.97998h1.70996v-12.67999l2.02002,.02997-.02002,3.96002,44.8999,4.42999,.02002-.04999,.07007-.17999,.01001-.04004-26.97998-2.66998v-.00009Zm-34.15991-163.26001h-1.88013v2.73999h-33.30005v-19.69995h33.30005v1.81h1.88013v15.14996Zm-36.39014,3.97003v-22.34003h34.79004v-1.32996h1.6001v4.26996h-1.6001v-1.81h-33.86011v20.26001h33.86011v-2.73999h1.6001v3.66998l-2.9502,.02002h-33.43994Zm15.26001,6.54999l.21997-.01001c1.57007-.08997,3.03003-.75,4.14014-1.87,1.09985-1.12,1.75-2.59998,1.81982-4.15997l.01001-.23004h11.80005v24.29004h-9.66992v1.32001h9.66992v40.37h-10.47998l-.02002-.22003c-.18994-2.95001-2.6499-5.26001-5.60986-5.26001h-.5v-4.42999h-11.54004l-.01025-46.33997h14.21021v-1.44h-4.04004v-2.02002Zm3.76001,2.29999v.88h-13.93018v-.88h13.93018Zm-8.08008,93.79004v10.81h-.97998v-6.13h-8.66992v6.13h-.9502v-44.47003h.83008v37.28998h2.76001v-42.13995h-.12988v-53.57001h-2.5v53.57001h-.96021v-57.34003h4.47021l.01001,49.84003h11.53979v11.29999h-1.42993v-8.19h-10.05005v41.89001h13.95996v1.01001h-7.8999Zm-7.54004-37.98004v3.79004h-2.93994v-3.79004h2.93994Zm-1.81982-.52997v-53.29004h1.93994v53.29004h-1.93994Zm1.81982,4.84998v36.76001h-1.69995v-36.76001h1.69995Zm14.1001,42.32001c-.64014-2.85999-3.12988-4.96002-6.06006-5.12l-.21997-.02002v-3.23999h7.90991v-1.57001h-13.96997v-41.33002h9.48999v8.19h1.99023v-7.14996h.5c2.94971,0,5.33984,2.39001,5.33984,5.33997v.23004h-.12012v1.88995h10.76025v42.96002h-15.58008l-.04004-.17999Zm.15991,1.76001v-.33002c0-.13-.01001-.26001-.01978-.39996l-.02002-.31006h16.02979v-44.03998h-10.75977v-1.44h10.63989v-66.26001l2.86011-.01996v112.79999h-18.73022Zm-14.84985,13.89001v14.88h-1.22998v-14.87006l1.22998-.00995ZM245.75,220.71201h.94995v14.77002h-.94995v-14.77002Zm-8.1001,5.17993h7.82007v.83008h-7.82007v-.83008Zm0,1.11011h7.82007v12.27997l-.26001-.03003c-1.91992-.19-3.37988-1.73999-3.48999-3.64001h-.30005c-.10986,1.90002-1.58984,3.44-3.52002,3.63l-.25,.02002v-12.25995Zm8.1001-40.34009h.94995v14.77002h-.94995v-14.77002Zm-8.1001-3.79004l.25,.03003c1.93018,.19006,3.41016,1.72998,3.52002,3.63013h.30005c.11011-1.90015,1.57007-3.45007,3.48999-3.65015l.26001-.02002v12.28003h-7.82007v-12.27002Zm0,12.55005h7.82007v.83008h-7.82007v-.83008ZM119.10986,18.22202h-3.78979v-4.04004h3.78979v4.04004Zm206.07007,405.84997h7.39014v1.12h-7.39014v-1.12Zm-17.48999,0h9.43994v1.51001h-9.43994v-1.51001Zm-51.40991-11.59998h1.11987v1.19995h-1.11987v-1.19995Zm-.29004-1.78003v2.97998h-24.26001v-31.39996h2.22998v28.41998h22.03003Zm-23.48999-126.66998h2.97998v126.39001h-1.23999v-82.04004l-3.41992-.01001v-3.25995l3.13989,.00995v2.78003h.28003v-41.89001h-.29004l.01001,38.83002-3.41992-.01001v3.82001l3.41992,.01001v53.33997h-2.51001v31.96002h1.01001l.05005,6.5h-1.71997v-39.62h1.76001v-51.34998h-4.72998v-.84003h1.82007v-3.82001h-1.82007v-.89001h4.67993v-39.90997Zm2.84009-18.20001c.20996,0,.37988,.16998,.37988,.38v5.20001c0,.20996-.16992,.38-.37988,.38h-7.52002v-1.27002h1.71997v-3.59998h-1.71997v-1.09003h7.52002Zm-1.09009-57.08997h-3.82007v3.59998h3.82007v1.27002h-6.42993v-1.27002h1.71997v-3.59998l-1.71997,.01001v-1.1001h6.42993v1.09009Zm-.20996,.28003v3.03992h-3.33008v-3.03992h3.33008Zm.48999-1.37012h.81006c.20996,0,.37988,.17004,.37988,.38013v5.19995c0,.20996-.16992,.38-.37988,.38h-.81006v-5.96008Zm0,6.23999h.84009c.02002-.01001,.0498-.02002,.07983-.02002l.27002-.04993v26.21002h.28003v-58.6601h-.28003v26.08008l-.27002-.05005c-.03003-.01001-.05981-.01001-.07983-.02002-.01025,0-.02002-.01001-.03003-.01001h-.81006v-27.5199h2.84009v62.03998h-2.84009v-28.00006Zm.81006-63.98999c.20996,0,.37988,.17004,.37988,.38013v5.19995c0,.20996-.16992,.38-.37988,.38h-7.52002v-1.27002h1.71997v-3.59998h-1.71997v-1.09009h7.52002Zm-1.30005-12.03992h-1.52002v-38.81995h1.52002v38.81995Zm0-40.65002h-3.33008v-3.04004h3.33008v3.04004Zm0-3.32007h-3.61011v3.6001h3.61011v1.27002h-6.21997v-1.27002h1.71997v-3.6001h-1.71997v-1.08984h6.21997v1.08984Zm0-16.8999h-2.21997v-31.54004h2.21997v31.54004Zm1.67993,60.87h-1.3999v-38.81995h1.02002c.01001,0,.01978,0,.03003-.01001,.02002,0,.0498-.01001,.07983-.01001l.27002-.05005v38.89001Zm0-39.4801c0,.21008-.16992,.38013-.37988,.38013h-1.02002v-5.95996h1.02002c.20996,0,.37988,.16992,.37988,.37988v5.19995Zm0-5.78992l-.27002-.03992c-.03003-.01001-.05981-.02002-.07983-.02002-.01025-.01001-.02002-.01001-.03003-.01001h-1.02002V45.16196h-2.78003v32.1001h1.85986v15.25h-1.09985v-14.13013h-39.82007v-5.13989h9.76001v4.02002h28.25v-31.88013h-5.86011v-11.52991h-.27979v2.20996h-31.77002v9.73999h-1.47021v-12.45996h34.40015v11.01001h8.59985v-1.30005h1.61011v49.53003Zm-44.51001-21.47998v-9.65002h1.37012v11.28003l-.01001,.22998h-.46997v-1.85999h-.89014Zm-15.02002-2.01001v8.47998h-3.45996v4.28003h-2.43994v1.52991h.01001v5.63013l-.25-.02002c-2.88989-.19995-5.15015-2.61011-5.19995-5.48999v-1.64014h-.28003v1.64014c.05005,3.19995,2.65991,5.78003,5.86987,5.78003h.14014v-5.90015h2.1499v11.19006h-12.98999v-3.76001h-1.19995c-3.05005,0-5.6001-2.38-5.80005-5.41003l-.02002-.16992v-.08008h5.37012v-.01001h1.82983v-22.23999h-2.02002v1.90002h-19.00977v-14.00989h19.02002v4.86987h1.45996v-8.05994h12.61987v2.21997h4.93994v3.09998h1.80005v-6.84998l.23999,.02002c3.20996,.13,5.73999,2.69006,5.86011,5.87h.27979v-.02002c0-3.07007,2.41016-5.64001,5.47021-5.83997l.25-.02002v7.35999h7.81006l-.02002,.25c-.2002,3.08008-2.80005,5.5-5.90015,5.5h-.13989v.44995h-.62012v1.53003h-1.03003v9.93005h-.28979c-2.36011,0-4.51025,1.48999-5.34009,3.70996h-.44019c-.80981-2.16003-2.81982-3.60999-5.12988-3.69006l-.22998-.01001v-2.0199s-3.31006,0-3.31006,0Zm3.03003,36.67004v49.44995h-.98999V77.79208h.98999v27.09985h14.01001v-.94995h.8501v18h-.8501v-16.16992l-14.01001-.01001Zm13.20996,15.66992l.36011,1.64001h-12.97998l-.2002-1.64001h12.82007Zm-12.82007-1.91992h12.82007l.36011,1.63989h-12.97998l-.2002-1.63989Zm12.82007,3.83997l.36011,1.64001h-12.97998l-.2002-1.64001h12.82007Zm0,1.92004l.36011,1.62988h-12.97998l-.2002-1.62988h12.82007Zm0,1.91992l.36011,1.63h-12.97998l-.2002-1.63h12.82007Zm0,1.91003l.36011,1.64001h-12.97998l-.2002-1.64001h12.82007Zm0,1.92004l.36011,1.63989h-12.97998l-.2002-1.63989h12.82007Zm0,1.91992l.36011,1.64001h-12.97998l-.2002-1.64001h12.82007Zm0,1.91992l.36011,1.64014h-12.97998l-.2002-1.64014h12.82007Zm0,1.92017l.36011,1.62988h-12.97998l-.2002-1.62988h12.82007Zm0,1.91992l.36011,1.63h-12.97998l-.2002-1.63h12.82007Zm.52002,1.90991v1.64014h-13.44995v-1.64014h13.44995Zm-13.44995-21.37988v-13.18005h13.44995v13.18005h-13.44995Zm-1.27002-41.71997v-6.13013h.98999v6.13013h-.98999Zm.98999-6.41003h-1.27002v7.15002h-1.47998v-8.87012h2.75v1.7201Zm-19.76001,24.5199h-.78003v-4.5199h.78003v4.5199Zm-2.97998-29.48999v17.22009h-1.20996v-17.22009h-21.92993v-1.04993h4.34985v-17.76001h-10.72998v-.76001c0-.03992,0-.08997-.01001-.13v-.10999l-.01001-.23999h51.51001v6.55994h-1.23999v-3.09985h-4.92993v-2.22009h-13.18994v8.05994h-.90015v-4.86987h-19.58008v14.56995h19.58008v-1.90002h1.4502v21.67993h-1.18018v-18.72998h-1.97998v-.00002Zm-29.48999-1.32996v.91003c0,3.20996-2.5,5.87-5.68994,6.08008l-.25,.00989v-7h-1.65991v-17.44995h1.59985v-6.63l.25,.02002c3.05005,.19995,5.43994,2.76001,5.43994,5.81995v1.04004h10.73022v17.19995h-10.42017Zm3.30005,.28003v1.04993h-3.03003l.01001-.23999v-.08997c0-.02991,.01001-.05994,.01001-.08997v-.63s3.01001,0,3.01001,0Zm2.77002,0v1.04993h-2.48999v-1.04993h2.48999Zm-2.48999,1.32996h2.48999v53.54004h9.63989v.97998h-12.12988v-54.52002Zm68.07007-14.06995v.80994h-7.53027v-.80994h7.53027Zm-7.53027-.28003v-5.97998h1.47021v5.97998h-1.47021Zm39.09009-6.40002v31.32007h-27.67993v-4.02002h-9.66016v-13.48999l.22021-.01001c3.13989-.16992,5.63989-2.66003,5.81982-5.80005l.02002-.21997v-1.09998h2.49023l-.12012,12.94006h.95996v-13.22009h-9.39014v-15.71997h31.49023v9.31995h5.84985Zm-38.98999,25.71997h.61011v1.58008h-.61011v-1.58008Zm34.55005-38.85986h1.48999v.95996h-1.47998l-.01001-.95996Zm8.34985,.29993l1.24023-.01001,.06006,2.22009h-1.30029v-2.21008Zm-.27979,.94006v1.54993h1.3999c4.06006,0,7.39014,3.17004,7.59009,7.21008l.02002,.25h-9.01001v1.29993h-8.04004v-10.30994h8.04004Zm-1.72998-7.38013v.44006c-.14014,.04993-.27002,.09998-.40015,.17004h-.01001c-2.06006,.91992-3.56982,3.02002-3.51001,5.62988v.27002l-.6499,.01001v-.65991h-1.55005c-.03003,0-.05005,0-.08008,.01001-.02979,.01001-.05981,.02002-.08984,.03003-.05005,.0199-.09009,.03992-.12012,.06995-.11987,.06995-.19995,.21997-.19995,.38v.32996h-34.67993v12.76001l-.21997,.01001c-.15015,.01001-.30005,.02991-.44019,.04993-.31982,.03003-.62988,.1001-.92993,.19006,0,0-.01001,0-.02002,.01001h-.01001c-.02002,.01001-.04004,.01001-.06006,.02002-.09985,.02991-.20996,.05994-.31982,.10999-.06006,.02002-.13013,.05005-.18994,.07007-.27002,.10986-.52002,.23999-.77002,.37988-.47021,.27002-.89014,.61011-1.27002,.98999-.09009,.09009-.16992,.18005-.26001,.28003l-.02002,.02002c-.51001,.58008-.90015,1.26001-1.15991,2.02002l-.42017,.01001c-.25-.68005-.61987-1.31006-1.09009-1.8501-.0498-.07996-.11987-.15991-.18994-.22998l-.01001-.01001c-.03003-.02002-.05005-.03992-.05981-.05994-.01025,0-.01025-.01001-.01025-.01001-.05981-.06995-.11987-.13-.17993-.18005-.01978-.02002-.05005-.04993-.07007-.06995-.03979-.02991-.06982-.06995-.10986-.09998-.06006-.07007-.12988-.12-.19995-.17993h-.01001c-.04004-.04004-.08008-.08008-.12012-.11011-.02002-.01001-.02979-.02002-.04004-.03003-.12988-.09998-.27002-.19995-.40991-.29004-.11987-.07983-.25-.15991-.37988-.22998-.02002-.01001-.04004-.02002-.06006-.02991-.13989-.07996-.30005-.16003-.44995-.2301-.18018-.07983-.36011-.1499-.55005-.21997-.05005-.02002-.1001-.03003-.15015-.04993-.00652,0-.01318-.00334-.02002-.01001-.00977,0-.01978,0-.02979-.01001h-.02002c-.00667,0-.01335-.00334-.02002-.01001-.59009-.17004-1.20996-.27002-1.84009-.27002h-51.78979l-.03027-.19995c-.22998-1.42004-.95996-2.72009-2.0498-3.67004-.11011-.08997-.20996-.17993-.32007-.26001-.00667,.00668-.01001,.00668-.01001,0-.10986-.07996-.21997-.15991-.33008-.22998h-.00977c-.12012-.08008-.23022-.1499-.3501-.20996-.12012-.07007-.23999-.13-.36011-.18994-.16992-.08008-.32983-.15015-.5-.21008-.16992-.06995-.34009-.12-.51001-.17004-.52002-.1499-1.06006-.21997-1.60986-.21997h-.15015v6.63h-1.28979v-12.03992h1.81982v-7.39014l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h43.06005v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002v7.46997h1.73999V18.50204h47.34009v2.45996h2.34985l.02002,.21997c.14014,2.3501,1.67017,4.39001,3.90015,5.19995h0Zm-104.57007,8.37013v-.70007h42.47998v.70007h-42.47998Zm106.30005-14.56006l-5.3501-.03003v-.80994h-1.27002v-.85999h6.62012v1.69996Zm-56.66992-6.01001h13.16992v2.6001h-13.16992v-2.6001Zm-3.77002,0h3.48975v2.88h13.72998v-6.70007h34.69019v3.82007h254.82007v4.03003H235.10986v1.97998h-1v-1.97998h-7.17993v1.41992h1.27002v1.05005h-2.07007v-2.45996h-52.73975v-4.04004Zm-54,0h53.71973v1.25h-53.71973v-1.25Zm0,1.53003h53.71973v.83997h-53.71973v-.83997Zm0,1.12h53.71973v1.39001h-53.71973v-1.39001Zm-.15015,16.94006v-15.27002h58.95996v16.32996h-1.1499v-7.47009h-.13989c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994Zm16.92993,93.44995l-.00977,.21997h-16.77002v-62.35999h1.37988v7h.14014c3.13989,0,5.84985-2.34998,6.28979-5.47009l.03003-.19995h3.06007v54.80005h9.40991l.1001,.43994c-2.11011,1.08008-3.5,3.20996-3.63013,5.57007Zm33.57007,.21997h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995,.11011-.06006,.22998-.12012,.34985-.17004h.01025c.44995-.21997,.91992-.38,1.41992-.46997,.03003-.01001,.06982-.01001,.1001-.02002,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001h21.6499v17.21997h1.77002v-17.21997h1.41992v18.44995h-5.73999v.14014c0,2.86987,2,5.29004,4.70996,5.91992h.01025c.32983,.09009,.66992,.14001,1.01978,.16003l.21997,.01001v4.80994h1.06006v.02002h10.28003v31.52003Zm-10-31.81006v-.77991h12.98999v.77991h-12.98999Zm10.28003,31.81006v-31.52002h2.98999v-11.72998h4.01001v-4.04004h-4.01001v-1.61987h4.93994v72.37988h-4.35986v2.51001l-.40015,.16003-.45996-.46008v-25.67993h-2.70996Zm3-43.53003v-3.46997h3.71997v3.46997h-3.71997Zm4.92993,67.28003v4.02002h-4.07983v-4.02002h4.07983Zm-48.59985,4v-3.84998h4.42993v3.84998h-4.42993Zm1.84985,11.66992l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v5.40991h-2.58008Zm28.11011,39.99011l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm-7.43994-34.74011l3.45996-1.56982,.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009Zm23.21997,.95007c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004,.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13Zm.70996,27.41003l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.47998,1.17993l9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997-.38013-.92004Zm-13.42017,84.53004v-78.04004l2.51025-.95996v81.11005l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004Zm-49.61987-111.63989l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h13.99999l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017s0-91.96991,0-91.96991Zm-2.11011,118.1499v-3.83997h4v3.83997h-4Zm66.84009,138.42999h-49.07983v-14.26996h-41v-28.02002H25.91016l2.65991-44.41998H14.97998l1.14014-17.38h14.7998v-38.56H110.81006v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001-12.05005,1.54999v-2.88l3.55005-.57996v-11.79004l-15.82983,2.13v35.95001h-1.70996v11.45001h-.75v-50.34998H33.56006l-.1499,34.12994h1.88989v4.83002H18.17993l-.78979,12.48999h13.6499l-2.54004,44.70001h59.39014v-35.48999h.75v11.81h1.70996v51.41998h38.52002v-11.17999h-2.03003v-22.33002h3.57007v3.85004h3.57983v1.67999h-5.38013v14.65997h37.31006v-15.40997h-4.83984v-1.23999h6.87988v.95001h-.86987v16.70996h-36.29004v16.37h37.15991v10.29004h4.87012v1.45996h4.16992v-3.89996l.21997-.01001c.15991-.01001,.33008-.02002,.47998-.04999l.27002-.04004v4.94Zm-100.19995-90.28998v.14001c0,5.39996,4.21997,9.84998,9.62012,10.14996l.21973,.01001v35.22003H28.80005l3.20996-56.62h3.57007v-5.40002h-1.89014l.15015-33.57001h53.76978v50.07001h-9.83984Zm9.83984,.27997v9.74005l-.25-.02002c-5.10986-.28998-9.10986-4.37-9.2998-9.47003l-.01001-.25h9.55981Zm-58.17993-11.38995h2.30005l-.67993,11.92999h-2.25l.62988-11.92999Zm-.90991,11.92999h-10.83008l.75-11.92999h10.7002l-.62012,11.92999Zm100.07007,61.82001v10.62h-28.51001v-.27002c0-3.27002,2.66992-5.92999,5.93994-5.92999h.14014v-13.21002h20.3999v8.79004h2.03003Zm28.51001-11.56l4.86987,4.44995-.15991,.41003h-9.41992l-.16016-.41003,4.87012-4.44995Zm-5.14014,4.32001l-.38989-.17004v-8.67999l.38989-.16998,4.93994,4.51001-4.93994,4.51001Zm5.3501-4.51001l4.93994-4.51001,.39014,.16998v8.67999l-.39014,.17004-4.93994-4.51001Zm-.20996-.19l-4.87012-4.45001,.16016-.41003h9.41992l.15991,.41003-4.86987,4.45001Zm-4.41016-5.14001h-10.5v-1.53998h10.5v1.53998Zm-8.33984,10.65997v-10.38h6.93994v10.38h11.62988v-11.13h2.72021v14.85004h-36.75v-14.10004h3.82983v10.38h11.63013Zm28.75977,32.85004v-3.60999h3.61011v3.60999h-3.61011Zm9.36011-9.63l-.01001,.23999c-.0498,3.03003-2.56982,5.5-5.6001,5.5h-4.02979v2.42999h-4.59009v-10.28998h-37.15991v-15.81h36.29004v-16.71002h.59985v.22003c.07007,1.56,.71997,3.00995,1.84009,4.08997,1.11987,1.09003,2.6001,1.69,4.15991,1.69h.13989v-5.66998l.9502-.01001v16.28998h.96997v18.03003h6.43994Zm-7.12988-18.31v-16.29004l-1.23022,.01001v-5.14996h3.98022v39.45996h-1.78003v-18.02997h-.96997Zm49.84985,16.40997v8.92999l-.25-.00995c-3.58984-.21002-6.40991-3.19-6.40991-6.79004v-.13h-.28003v.42004c0,3.44-2.67993,6.28998-6.10986,6.5l-.25,.00995v-7.13995h-15.41016v7.13995l-.25-.00995c-3.5-.20001-6.23999-3.11005-6.23999-6.62006v-.46997h-.29004v1c0,3.21002-2.5,5.88-5.70996,6.09003l-.25,.00995v-8.92999h-5.36987v-38.12h-4.54004v11.10004l-.25-.02002c-2.98999-.20001-5.34009-2.71002-5.34009-5.71002v-1.5h-7.43994v2.27002h-7.83008v-1.82001h-11.05981v1.82001h-7.64014v-1.96002h-3.58008v-3.84998h-4.12988v13.82001h-20.68018v13.20001l-.21973,.01996c-3.29004,.19-5.86011,2.91003-5.86011,6.20001v.27002h-9.17017v-51.42004h-1.70996v-11.81h-1.02979v-9.75h1.02979v-11.44995h1.70996v-35.98004l15.27002-2.06v11.23004l-3.5498,.57996v3.44l12.35986-1.57996,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-9.03003v-5.40991h-.01001v-.28003l.01001-5.96997v-3.85999h4.23999c3.55981,0,6.51001-2.79993,6.69995-6.35999l.01001-.21997h10.97998v9.73999h15.05005l1,1h7.45996v-12.96997h13.72998v-20.30005h1.12988v-18.58008h-1.40991v.95996l-13.44995-.00989v-33.21008l.25,.01001c2.91016,.13013,5.18994,2.5,5.18994,5.40002v.9801h.28003v-.9801c0-2.98999,2.42993-5.42004,5.42017-5.42004h.28979v7.28003h41.09009v13.8501h-4.47998v1.6499h1.71997v3.04004h-1.71997v1.83008h4.69995v38.81995h-3.65991v.14001c0,2.43994,1.5498,4.62988,3.84985,5.43994v.43994c-2.30005,.88013-3.80981,3.04004-3.83984,5.5l-.01001,.23999h-1.04004v1.65015h1.71997v3.03992l-1.71997-.00989v1.83984h1.04004v.22998c.01001,2.38013,1.51001,4.53003,3.72998,5.36011v.43994c-2.21997,.83008-3.71997,2.97998-3.72998,5.36011v.73999c.02002,2.42993,1.56982,4.61987,3.84985,5.45996v.43994c-2.30005,.8501-3.84985,3.08008-3.84985,5.54004v.14001h5.66992v27.5199h-6.70996v1.66016l1.71997-.01001v3.03992h-1.71997v1.83997l6.70996-.01001v28.00006h-5.66992v.14001c0,2.41998,1.54004,4.58002,3.83008,5.37l.00977,.44c-.72998,.28998-1.37988,.71997-1.94995,1.27002-1.11987,1.09998-1.75,2.56995-1.76001,4.13995l-.01001,.73004c-.03003,2.42999,1.48999,4.64996,3.77002,5.51996l-.01001,.44c-.79004,.29004-1.51001,.73999-2.11987,1.34003-1.1001,1.07001-1.71997,2.51001-1.75,4.03998l-.01001,.23004h-1.04004v1.65997l1.71997-.01001v3.04004h-1.71997v1.83997h.83984l.01025,.22003c.12988,2.47998,1.71973,4.62994,4.06982,5.46997v.44c-2.33984,.85999-3.91992,3.14001-3.91992,5.67999v.14001h3.67993v39.63h-4.67993v1.45001h1.81982v3.25995h-1.81982v1.40002h4.72998v50.78998h-1.76001v37.82001h-5.32007Zm5.32007,.28003v1.83002h-5.04004v-1.83002h5.04004Zm-.18994,7.08002c-2.6001,0-4.77002-2.12006-4.84009-4.73004l-.01001-.23999,7.26001-.01001v-6.79999h24.68018l.00977,.21997c.18994,3.01001,2.7002,5.36005,5.70996,5.36005h.90015v8.01001h-12.44995v2.22998h-16.20996v-4.03998h-5.05005Zm44.53003,5.41998h-3.47998v-4.48999h3.47998v4.48999Zm24.91992-16.35004c-.1499,1.59003-1.17993,3.10004-2.89014,4.25-.63989,.43005-1.33984,.78003-2.07983,1.06-.25,.09003-.5,.17004-.76001,.25-.25,.08002-.5,.14001-.76001,.19h-.02002c-.20996,.05005-.41992,.09003-.63013,.12-.58984,.09003-1.18994,.14001-1.7998,.14001h-3.9502v-6.70996h-.2998v6.70996h-1.53003v-6.70996h-.30005v6.70996h-1.52002v-6.70996h-.30005v6.70996h-1.48999v-6.64996h-.2998v6.64996h-1.65015v-6.64996h-.30005v6.64996h-1.5v-6.95001h-.2998v7.24005h13.43994c.3999,0,.81006-.03003,1.31006-.08002l.25977-.03003v8.61005h-17.27002v-3.22003h-4.05981v3.22003h-15.15015v-.84003h9.84009v-15.13h-.30005v14.85004h-9.83984v1.39996h15.44995v1.27002h-40.28003v-5.14001h4.28003v4.03998h16.78979v-2.22998h12.4502v-17.71002h29.73999v4.43005h5.73999l-.02002,.25995Zm40.64014,14.97003h-46.32007v-3.91003h6v-9.62994l.25,.00995c3.95996,.21002,7.07007,3.48004,7.07007,7.45001v2.16998h10v-9.59998l.25,.01001c4.05981,.20001,7.23975,3.54999,7.23975,7.60999v1.59003h7.9502v-9.21002l.23999,.01001c4.09985,.20001,7.32007,3.58002,7.32007,7.69v5.81Zm184.48975-16.41003v-3.44h26.07007v3.44h-26.07007Zm62.83008-3.44h3.59009v3.51001h-3.59009v-3.51001Zm-19.83008,20h-3.72998v-3.27997h3.72998v3.27997Zm38-.82996h-37.71997v-2.73999h-2.57983v-12.64001h32.71997v6.01001h6.17993v-6.66003h1.3999v16.03003Zm8.36011-2.98004h-1.69995v2.98004h-6.38013v-15.38h8.08008v12.39996Zm2.31006-12.64996l-1.79004-.02002-.15991-.01001h-.33008l-1.20996-.01996v-3.49005h3.48999v3.54004Zm17.70996,5.70001l-17.42017-1.72003v-7.79999h-3.50977l-.02002-.47003c3.31982-.37994,5.81982-3.18994,5.81982-6.52997v-.32001h15.13013v16.84003Zm-55.30005-152.99005v2.30005h.02002v-2.30005h-.02002Zm-9.88989,.24005v2.06h.01978v-2.06h-.01978Zm9.88989-.24005v2.30005h.02002v-2.30005h-.02002Zm18.30005,81.20001v-.01001h-.13989v1.80005h.1499v-1.79004h-.01001ZM245.44995,220.43198v5.17993h.02002v-5.17993h-.02002Zm-4.10986,16.63c-.23022,.52002-.56006,.98004-.96997,1.35999,.41992-.37,.75977-.82996,.98975-1.35999h-.01978Zm-.96997-53.33997c.40991,.38,.73975,.83997,.96997,1.35999h.01978c-.22998-.53003-.56982-.98999-.98975-1.35999Zm1.38989,1.35999h.02002c.25-.56995,.61987-1.05994,1.07007-1.46008-.45996,.38013-.83008,.88013-1.09009,1.46008Zm-23.13013,237.77997c.22021,.61005,.52002,1.19,.90015,1.70001-.36011-.51996-.65991-1.08997-.88013-1.70001h-.02002Zm7.28027,.59003h-.02002c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19ZM183.62988,48.13193c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm5.66992-16.91003v12.76001h.02002v-12.76001h-.02002Zm11.17993,25.58997l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm-47.07983,10.52002v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm1.91992,24.39001c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm19.05981-33.72998c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-30.22998,16.43994v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-9.65991-15.44995v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm.07983,7.78003v9.43994h.1001l-.1001-9.43994Zm-34.31006-33.75v6.63h.02002v-6.63h-.02002Zm62.94995,7.68994c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm5.66992-16.91003v12.76001h.02002v-12.76001h-.02002Zm11.17993,25.58997l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm26.18994-23.27002v.27002h.02002v-.27002h-.02002Zm.28003,0v.27002h.02002v-.27002h-.02002Zm5.3501-.12988v.37988h.02002v-.37988h-.02002Zm-6.30005-.25v.65991h.02002v-.65991h-.02002Zm-106.83008,8.19995v6.63h.02002v-6.63h-.02002Zm6.19995,5.16003c-.22998-1.42004-.95996-2.72009-2.0498-3.67004-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995Zm-.47998-14.88c.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h.02002v-1.20007c0-1.13-.31006-2.20007-.8501-3.10999Zm52.07007-12.21997v16.60986h.02002V18.50204h-.02002v.00003Zm5.15991,29.62988c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm41.86011-15.3999v.32996h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38Zm-104.81006,7.70996v6.63h.02002v-6.63h-.02002Zm56.23022-13.08008c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h43.06005v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002v7.46997h.02002v-.27991h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm-.65015,11.55005c-.22998-1.42004-.95996-2.72009-2.0498-3.67004-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995Zm51.59009-27.09998v16.60986h.02002V18.50204h-.02002v.00003Zm47.02002,14.22998v.32996h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38Zm.34009-14.22998v2.45996h.02002v-2.45996h-.02002Zm-104.64014,9.13989v7.19006h.02002v-7.19006h-.02002Zm49.08008,6.62012v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008-6.62012v7.19006h.02002v-7.19006h-.02002Zm49.08008,6.62012v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008-6.62012v7.19006h.02002v-7.19006h-.02002Zm49.08008,6.62012v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm6.64014-6.90015c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm27.45996,40.14001v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-9.06006,89.75l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-11.89014l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00668,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.98h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998v-.00002Zm-74.56006,89.53004h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.75-136.16003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm6.59009,72.3501h-.02002l1,1h.02002l-1-1Zm1.28979-.96997v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008h.02002v-.83008l-1.14014-1.13989Zm5.90015,265.40997v1.33997h.02002v-1.33997h-.02002Zm2.82983,5.71997c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm1.54004-4.38v.42004c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002Zm.90991-371.86005c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm5.66992-16.91003v12.76001h.02002v-12.76001h-.02002Zm11.17993,25.58997l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm-5.51001,364.27007v.02997h15.41016v-.02997h-15.41016Zm-15.30005,4.20996c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm-25.66992-252.76007l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-9.03003v-5.40991l-.28003,3.37v2.03992h-2.58008l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-74.56006,89.53003h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.75-136.16003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm6.59009,72.3501h-.02002l1,1h.02002l-1-1Zm1.28979-.96997v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008h.02002v-.83008l-1.14014-1.13989Zm5.90015,265.40997v1.33997h.02002v-1.33997h-.02002Zm4.36987,1.33997v.42004c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002Zm.90991-371.86005c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm2.25977,376.33996c-.0498,.04004-.09985,.08002-.15991,.10999,.07007-.01996,.11987-.06,.17993-.10999,.11011-.07996,.22021-.16998,.32007-.26996-.11011,.08997-.21997,.17999-.34009,.26996Zm2.28003-3.20996c-.21997,.71997-.58984,1.38995-1.05005,1.98999,.49023-.59003,.8501-1.27002,1.07007-1.98999h-.02002Zm1.13013-390.04004v12.76001h.02002v-12.76001h-.02002Zm11.17993,25.58997l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm-5.51001,364.27008v.02997h15.41016v-.02997h-15.41016Zm21.70996,2.69995c-.21997,.71002-.5498,1.36005-.96997,1.93005,.44019-.57001,.77002-1.22003,.98999-1.93005h-.02002Zm.43994,0c.22021,.61005,.52002,1.19,.90015,1.70001-.36011-.51996-.65991-1.08997-.88013-1.70001h-.02002Zm0,0c.22021,.61005,.52002,1.19,.90015,1.70001-.36011-.51996-.65991-1.08997-.88013-1.70001h-.02002Zm7.28027,.59003h-.02002c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19Zm38.37988-9.17999v13.54999h.02002v-13.54999h-.02002Zm10.81982,12.10999v3.22003h.02002v-3.22003h-.02002Zm-11.06982-14.10999v2h.25v13.54999h.02002v-15.54999h-.27002Zm1.41992,1.35999v.64001h.30005v-.64001h-.30005Zm11.93018,.22998v.41003h.2998v-.41003h-.2998Zm1.7998,.30005v.10999h.30005v-.10999h-.30005Zm1.9502,0v.10999h.2998v-.10999h-.2998Zm1.78979-.06v.16998h.30005v-.16998h-.30005Zm-1.78979,.16998h.2998v-.10999h-.2998v.10999Zm3.60986-.16998v.16998h.30005v-.16998h-.30005Zm1.83008,0v.16998h.2998v-.16998h-.2998Zm-1.83008,.16998h.30005v-.16998h-.30005v.16998Zm9.32007,6.91998v2.60004h.02002v-2.60004h-.02002Zm5.71997,2.88v1.51001h.02002v-1.51001h-.02002Zm0-7.02002v6.74005h.02002v-6.74005h-.02002Zm5.63989,1.19c-.25-.25-.51001-.47998-.78979-.69,.27002,.22003,.52979,.45001,.77002,.69,1.41992,1.42999,2.21973,3.32001,2.25,5.32001v.23004h.01978v-.23004c-.03003-2-.82983-3.89001-2.25-5.32001Zm11.67993-2.25995v7.81h.02002v-7.81h-.02002Zm8.05029,7.58997c-.08008-2.04999-.94019-3.95001-2.41016-5.38-.07007-.06-.12988-.12-.18994-.16998,.06006,.06,.10986,.10999,.16992,.16998,1.46997,1.42999,2.33008,3.33002,2.41016,5.38l.00977,.22003h.02002l-.00977-.22003Zm7.38989-7.58997v7.81h.02002v-7.81h-.02002Zm256.11987-34.64001v3.77997h.02002v-3.77997h-.02002Zm2.91016,28.29999v3.78998h.02002v-3.78998h-.02002Zm7,3.78998v6.01001h.02002v-6.01001h-.02002Zm5.61987-.64996v6.65997h.02002v-6.65997h-.02002Zm-25.21997-146.61005v2.30005h.02002v-2.30005h-.02002Zm-9.88989,.24005v2.06h.01978v-2.06h-.01978Zm9.88989-.24005v2.30005h.02002v-2.30005h-.02002Zm18.30005,81.20001v-.01001h-.13989v1.80005h.1499v-1.79004h-.01001ZM245.44995,220.43198v5.17993h.02002v-5.17993h-.02002Zm-4.10986,16.63c-.23022,.52002-.56006,.98004-.96997,1.35999,.41992-.37,.75977-.82996,.98975-1.35999h-.01978Zm-.96997-53.33997c.40991,.38,.73975,.83997,.96997,1.35999h.01978c-.22998-.53003-.56982-.98999-.98975-1.35999Zm1.38989,1.35999h.02002c.25-.56995,.61987-1.05994,1.07007-1.46008-.45996,.38013-.83008,.88013-1.09009,1.46008Zm-23.57007,237.77997c-.21997,.71002-.5498,1.36005-.96997,1.93005,.44019-.57001,.77002-1.22003,.98999-1.93005h-.02002Zm7.72021,.59003h-.02002c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19Zm38.37988-9.17999v13.54999h.02002v-13.54999h-.02002ZM183.62988,48.13193c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm5.66992-16.91003v12.76001h.02002v-12.76001h-.02002Zm11.17993,25.58997l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm-47.07983,10.52002v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm1.91992,24.39001c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm19.05981-33.72998c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-30.22998,16.43994v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-9.65991-15.44995v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm.07983,7.78003v9.43994h.1001l-.1001-9.43994Zm-34.31006-33.75v6.63h.02002v-6.63h-.02002Zm62.94995,7.68994c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm16.84985,8.67993l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm25.52002-23.6499v.65991h.02002v-.65991h-.02002Zm.66992,.37988v.27002h.02002v-.27002h-.02002Zm.28003,0v.27002h.02002v-.27002h-.02002Zm5.3501-.12988v.37988h.02002v-.37988h-.02002Zm-113.13013,7.94995v6.63h.02002v-6.63h-.02002Zm.51001-5.60999v.20007h.02002v-.20007h-.02002Zm5.68994,10.77002c-.22998-1.42004-.95996-2.72009-2.0498-3.67004-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995Zm.37012-10.77002v-1c0-1.13-.31006-2.20007-.8501-3.10999,.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h43.06006v-.20007h-43.04004Zm51.21997-16.32996v16.60986h.02002V18.50204h-.02002Zm5.15991,29.62989c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm5.66992-16.91003v12.76001h.02002v-12.76001h-.02002Zm34.67993-.32996v.32996h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38Zm2.02002-.48999v.65991h.02002v-.65991h-.02002Zm-106.83008,8.19995v6.63h.02002v-6.63h-.02002Zm56.23022-13.08008c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h43.06005v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002v7.46997h.02002v-.27991h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm-6.34009,.78003v.20007h.02002v-.20007h-.02002Zm5.68994,10.77002c-.22998-1.42004-.95996-2.72009-2.0498-3.67004-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995Zm51.59009-27.09998v16.60986h.02002V18.50204s-.02002,0-.02002,0Zm5.15991,29.62988c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm1.51025,1.84009h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm5.66992-16.91003v12.76001h.02002v-12.76001h-.02002Zm34.67993-.32996v.32996h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38Zm.34009-14.22998v2.45996h.02002v-2.45996h-.02002Zm1.67993,13.73999v.65991h.02002v-.65991h-.02002Zm-106.32007-4.6001v7.19006h.02002v-7.19006h-.02002Zm49.08008,6.62012v.56995h.02002v-.56995c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008-6.62012v7.19006h.02002v-7.19006h-.02002Zm49.08008,6.62012v.56995h.02002v-.56995c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm-49.08008-6.62012v7.19006h.02002v-7.19006h-.02002Zm49.08008,6.62012v.56995h.02002v-.56995c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm6.64014-6.90015c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm27.45996,40.14001v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001h21.57007v.00002Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.0901s-11.27002,0-11.27002,0Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-9.06006,89.75l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-9.03003v-5.40991l-.28003,3.37v2.03992h-2.58008l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97997h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998v.00002Zm-74.56006,89.53001h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm-.59985-105.19995v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm6.59009,72.3501h-.02002l1,1h.02002l-1-1Zm1.28979-.96997v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008h.02002v-.83008l-1.14014-1.13989Zm5.90015,265.40997v1.33997h.02002v-1.33997h-.02002Zm2.82983,5.71997c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm1.54004-4.38v.42004c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002Zm4.67993,6.32001c-.0498,.04004-.09985,.08002-.15991,.10999,.07007-.01996,.11987-.06,.17993-.10999,.11011-.07996,.22021-.16998,.32007-.26996-.11011,.08997-.21997,.17999-.34009,.26996Zm2.28003-3.20996c-.21997,.71997-.58984,1.38995-1.05005,1.98999,.49023-.59003,.8501-1.27002,1.07007-1.98999h-.02002Zm12.31006-364.45007l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm-5.51001,364.27008v.02997h15.41016v-.02997h-15.41016Zm21.70996,2.69995c-.21997,.71002-.5498,1.36005-.96997,1.93005,.44019-.57001,.77002-1.22003,.98999-1.93005h-.02002Zm.43994,0c.22021,.61005,.52002,1.19,.90015,1.70001-.36011-.51996-.65991-1.08997-.88013-1.70001h-.02002Zm-.43994,0c-.21997,.71002-.5498,1.36005-.96997,1.93005,.44019-.57001,.77002-1.22003,.98999-1.93005h-.02002Zm7.72021,.59003h-.02002c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19Zm38.37988-9.17999v13.54999h.02002v-13.54999h-.02002Zm10.81982,12.10999v3.22003h.02002v-3.22003h-.02002Zm24.68018-2.31v1.51001h.02002v-1.51001h-.02002Zm0-7.02002v6.74005h.02002v-6.74005h-.02002Zm5.63989,1.19c-.25-.25-.51001-.47998-.78979-.69,.27002,.22003,.52979,.45001,.77002,.69,1.41992,1.42999,2.21973,3.32001,2.25,5.32001v.23004h.01978v-.23004c-.03003-2-.82983-3.89001-2.25-5.32001Zm11.67993-2.25995v7.81h.02002v-7.81h-.02002Zm8.05029,7.58997c-.08008-2.04999-.94019-3.95001-2.41016-5.38-.07007-.06-.12988-.12-.18994-.16998,.06006,.06,.10986,.10999,.16992,.16998,1.46997,1.42999,2.33008,3.33002,2.41016,5.38l.00977,.22003h.02002l-.00977-.22003Zm7.38989-7.58997v7.81h.02002v-7.81h-.02002Zm256.11987-34.64001v3.77997h.02002v-3.77997h-.02002Zm9.91016,32.08997v6.01001h.02002v-6.01001h-.02002Zm5.61987-.64996v6.65997h.02002v-6.65997h-.02002Zm-6.91992-65.41003v-.01001h-.13989v1.80005h.1499v-1.79004h-.01001ZM201.98999,58.65195l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm-45.15991,34.91003c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-5.96997,13.77002v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-9.58008-7.66992v9.43994h.1001l-.1001-9.43994Zm21.92017-46.83008c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm-.28003,.78003v.20007h43.04004v-.20007h-43.04004Zm0,0v.20007h43.04004v-.20007h-43.04004Zm0,0v.20007h43.04004v-.20007h-43.04004Zm49.66016-7.47009c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm27.38013,32.35999v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm.07983,7.78003v9.43994h.1001l-.1001-9.43994Zm3.61011,21.43994v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-9.06006,89.75l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-9.03003v-5.40991l-.28003,3.37v2.03992h-2.58008l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-74.56006,89.53003h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm3.09009-75.97998v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm37.41992-25.96997v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-5.51001,361.51007v.02997h15.41016v-.02997h-15.41016Zm-40.96997-248.55011l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-9.03003v-5.40991h-.01001v-.28003l.01001-5.96997v-3.85999l-.28003,4.14001v5.68994h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-54.48999-32.46008l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v5.40991h-2.58008Zm-20.07007,121.99011h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm3.09009-75.97998v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm37.41992-25.96997v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-5.51001,361.51007v.02997h15.41016v-.02997h-15.41016Zm400.66016-72.79004v1.79004h.1499v-1.79004h-.1499Zm0,0v1.79004h.1499v-1.79004h-.1499ZM155.51001,171.61191l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm-.59985-105.19995v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.02002v-1.64014h-.02002Zm-9.65991-15.44995v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.02002v-1.64014h-.02002Zm37.42993-23.19995l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm.01001,2.77002l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm-5.51001,364.27008v.02997h15.41016v-.02997h-15.41016Zm5.51001-364.27008v2h.26001v-2h-.26001Zm.01001,2.77002l-.02002,1.98999v.01001h.27002v-2h-.25Zm-37.42993,23.19995v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm.52002,97.41992l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm1.32007-80.80994c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm14.02002,108.47998l-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002c-.04004,.0199-.11987,.05994-.23999,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995v-.30005l-1.70996,.6499Zm-61.49023,84.74011h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm-9.86011-116.68011l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm9.06006-89.75v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.61011-21.43994v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm.07983,7.78003v9.43994h.1001l-.1001-9.43994Zm9.58008,7.66992v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm5.96997-13.77002v1.64014h.02002v-1.64014h-.02002Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm45.15991-34.91003v2h.26001v-2h-.26001Zm.01001,2.77002l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm.01001,2.77002l-.02002,1.98999v.01001h.27002v-2h-.25Zm-25.08984-31.30005c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm49.38013-6.69006c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm469.61011,313.32001v1.79004h.1499v-1.79004h-.1499Zm63.92993,75.88l-.09009,.22003h.02002l.09009-.22003h-.02002Zm-42.63013,3.87v4.03003h.02002v-4.03003h-.02002Zm-3.90991-13.40997v12.67999h.02002v-12.67999h-.02002Zm0,0v12.67999h.02002v-12.67999h-.02002Zm2.91992,5.40997v8h.02002v-8h-.02002Zm-2.91992-5.40997v12.67999h.02002v-12.67999h-.02002Zm-1.70996,12.67999v2.97998h.02002v-2.97998h-.02002Zm-8.62012-13.60999v6.65997h.02002v-6.65997h-.02002Zm-5.61987,.64996v6.01001h.02002v-6.01001h-.02002Zm-7-3.78998v3.78998h.02002v-3.78998h-.02002Zm-27.70996,19.72998v.84003h.02002v-.84003h-.02002Zm-12.64014-19.72998v4h.02002v-4h-.02002Zm-22.73999,17.02002v2.70996h.02002v-2.70996h-.02002Zm-2.59009-13.02002v13.02002h.02002v-13.02002h-.02002Zm-185.22998,10.70001v5.70996h.02002v-5.70996h-.02002Zm-23.56006-8.35999v7.81h.02002v-7.81h-.02002Zm-11.67993,2.25995c-.25-.25-.51001-.47998-.78979-.69,.27002,.22003,.52979,.45001,.77002,.69,1.41992,1.42999,2.21973,3.32001,2.25,5.32001v.23004h.01978v-.23004c-.03003-2-.82983-3.89001-2.25-5.32001Zm-5.63989-1.19v6.74005h.02002v-6.74005h-.02002Zm0,7.02002v1.51001h.02002v-1.51001h-.02002Zm-5.71997-2.88v2.60004h.02002v-2.60004h-.02002Zm-.26001-.23999v.15997l.01001,.08002h.02002l-.03003-.23999Zm0,0v.15997l.01001,.08002h.02002l-.03003-.23999Zm-.02002,0v3.12h.02002v-2.96002l-.02002-.15997Zm.02002,0v.15997l.01001,.08002h.02002l-.03003-.23999Zm0,0v.15997l.01001,.08002h.02002l-.03003-.23999Zm.26001,.23999v2.60004h.02002v-2.60004h-.02002Zm-.28003-.23999v3.12h.02002v-2.96002l-.02002-.15997Zm.02002,0v.15997l.01001,.08002h.02002l-.03003-.23999Zm-.02002,0v3.12h.02002v-2.96002l-.02002-.15997Zm0,9.09998h.02002v-4.46997h-.02002v4.46997Zm0-9.09998v3.12h.02002v-2.96002l-.02002-.15997Zm.02002,0v.15997l.01001,.08002h.02002l-.03003-.23999Zm-.02002,0v3.12h.02002v-2.96002l-.02002-.15997Zm.02002,0v.15997l.01001,.08002h.02002l-.03003-.23999Zm-1.13013,0v8.92999h.02002v-8.92999h-.02002Zm-.28003,.03998v8.61005h.02002v-8.61005h-.02002Zm-17.29004,5.39001v3.22003h.02002v-3.22003h-.02002Zm50.05029-2.81c-.08008-2.04999-.94019-3.95001-2.41016-5.38-.07007-.06-.12988-.12-.18994-.16998,.06006,.06,.10986,.10999,.16992,.16998,1.46997,1.42999,2.33008,3.33002,2.41016,5.38l.00977,.22003h.02002l-.00977-.22003Zm7.38989-7.58997v7.81h.02002v-7.81h-.02002Zm-7.38989,7.58997c-.08008-2.04999-.94019-3.95001-2.41016-5.38-.07007-.06-.12988-.12-.18994-.16998,.06006,.06,.10986,.10999,.16992,.16998,1.46997,1.42999,2.33008,3.33002,2.41016,5.38l.00977,.22003h.02002l-.00977-.22003Zm-8.05029-7.58997v7.81h.02002v-7.81h-.02002Zm-11.67993,2.25995c-.25-.25-.51001-.47998-.78979-.69,.27002,.22003,.52979,.45001,.77002,.69,1.41992,1.42999,2.21973,3.32001,2.25,5.32001v.23004h.01978v-.23004c-.03003-2-.82983-3.89001-2.25-5.32001Zm283.23999-36.89996v3.77997h.02002v-3.77997h-.02002Zm-37.43994,28.29999v4h.02002v-4h-.02002Zm52.96997,3.14001v6.65997h.02002v-6.65997h-.02002Zm-5.61987,.64996v6.01001h.02002v-6.01001h-.02002Zm-7-3.78998v3.78998h.02002v-3.78998h-.02002Zm-327.29004,4.63v13.54999h.02002v-13.54999h-.02002Zm-38.37988,9.17999h-.02002c.27002,.45001,.58984,.85999,.95996,1.19-.36011-.34003-.68018-.73999-.93994-1.19Zm-7.28027-.59003c.22021,.61005,.52002,1.19,.90015,1.70001-.36011-.51996-.65991-1.08997-.88013-1.70001h-.02002Zm-.43994,0c-.21997,.71002-.5498,1.36005-.96997,1.93005,.44019-.57001,.77002-1.22003,.98999-1.93005h-.02002Zm-21.70996-2.69995v.02997h15.41016v-.02997h-15.41016Zm5.51001-364.27008v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-1.13013,390.04004c-.21997,.71997-.58984,1.38995-1.05005,1.98999,.49023-.59003,.8501-1.27002,1.07007-1.98999h-.02002Zm-2.28003,3.20996c-.0498,.04004-.09985,.08002-.15991,.10999,.07007-.01996,.11987-.06,.17993-.10999,.11011-.07996,.22021-.16998,.32007-.26996-.11011,.08997-.21997,.17999-.34009,.26996Zm-2.25977-376.33997h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-2.44995,376.24006c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm1.54004-4.38v.42004c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002Zm-4.36987-1.33997v1.33997h.02002v-1.33997h-.02002Zm-5.90015-265.40997v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008h.02002v-.83008l-1.14014-1.13989Zm-1.28979,.96997h-.02002l1,1h.02002l-1-1Zm-6.59009-72.3501v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.09009,75.97998l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-11.89014l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-74.56006,89.53003h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm40.96997,248.55011v.02997h15.41016v-.02997h-15.41016Zm5.51001-364.27008v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-5.66992,16.91003h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-2.44995,376.24006c.3501-.37,.64014-.78998,.87012-1.23999-.23999,.45001-.53003,.87-.87012,1.23999Zm1.54004-4.38v.42004c0,.96997-.23999,1.89996-.66992,2.71997,.44995-.82001,.68994-1.75,.68994-2.71997v-.42004h-.02002Zm-4.36987-1.33997v1.33997h.02002v-1.33997h-.02002Zm-5.90015-265.40997v-25.52002h-.02002v25.52002l1.14014,1.13989v.83008h.02002v-.83008l-1.14014-1.13989Zm-1.28979,.96997h-.02002l1,1h.02002l-1-1Zm-6.59009-72.3501v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.09009,75.97998l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-11.89014l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-74.56006,89.53003h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm9.06006-89.75v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-3.61011-21.43994v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm22-39.05005c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm42.73999,.21008v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm0,0v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm0,0v.56995h-43.02002v.20007h43.04004v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007-.78003,1.08008-1.22998,2.40002-1.22998,3.82007Zm55.56006-15.76001v2.45996h.02002v-2.45996h-.02002Zm-.34009,14.22998v.32996h.02002v-.32996c0-.15002,.07007-.29004,.17993-.38-.11987,.06995-.19995,.21997-.19995,.38Zm2.02002-.48999v.65991h.02002v-.65991h-.02002Zm-49.04004-13.73999v16.60986h.02002V18.50204h-.02002Zm-1.55981,8.85986c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002v7.46997h.02002v-.27991h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm27.45996,40.14001v9.43994h.1001l-.1001-9.43994Zm9.58008,7.66992v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm1.77002,4.82996v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm26.54004-45.65991h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm-19.05981,33.72998v1.64014h.28003v-1.64014h-.28003Zm-4.78003-.35986v2h.12988v-2h-.12988Zm-4.80005-7.31006v9.43994h.1001l-.1001-9.43994Zm1.84009,16.60999c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm28.31006-40.82996h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm18.36011,7.76001v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-5.66992,16.91003h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm18.36011,7.76001v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-11.17993-25.58997v12.76001h.02002v-12.76001h-.02002Zm-5.66992,16.91003h.02002c.25977-.76001,.6499-1.43994,1.13989-2.02002-.51001,.58008-.90015,1.26001-1.15991,2.02002Zm-1.51025-1.84009c.4502,.54004,.82007,1.17004,1.07007,1.8501h.02002c-.25-.68005-.61987-1.31006-1.09009-1.8501Zm44.55005-15.51001v.27002h.02002v-.27002h-.02002Zm.28003,0v.27002h.02002v-.27002h-.02002Zm5.3501-.12988v.37988h.02002v-.37988h-.02002Zm-5.63013,.12988v.27002h.02002v-.27002h-.02002Zm.28003,0v.27002h.02002v-.27002h-.02002Zm5.3501-.12988v.37988h.02002v-.37988h-.02002Zm.2998,.32996l1.24023-.01001,.06006,2.22009v-2.30005l-1.30029,.08997Zm-.2998,.04993h.02002v-.37988h-.02002v.37988Zm-5.3501,.02002h.02002v-.27002h-.02002v.27002Zm-.28003-.27002v.27002h.02002v-.27002h-.02002Zm5.63013-.12988v.37988h.02002v-.37988h-.02002Zm-5.3501,.12988v.27002h.02002v-.27002h-.02002Zm-.28003,0v.27002h.02002v-.27002h-.02002Zm5.63013-.12988v.37988h.02002v-.37988h-.02002Zm-5.3501,.12988v.27002h.02002v-.27002h-.02002Zm-.28003,0v.27002h.02002v-.27002h-.02002Zm-.66992-.37988v.65991h.02002v-.65991h-.02002Zm-72.59985,34.16992v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm-28.03027-20.80994c-.22998-1.42004-.95996-2.72009-2.0498-3.67004-.11011-.08997-.20996-.17993-.32007-.26001,.09985,.09009,.19995,.17004,.30005,.26001,1.08984,.94995,1.81982,2.25,2.0498,3.67004l.03027,.19995h.02002l-.03027-.19995Zm-.47998-14.88c.52002,.91992,.83008,1.97998,.83008,3.10999v1.20007h.02002v-1.20007c0-1.13-.31006-2.20007-.8501-3.10999Zm-5.20996-3.08008v7.39014h.02002v-7.39014h-.02002Zm-.27979,6.41003v.70007h.01978v-.70007h-.01978Zm-.23022,6.39001v6.63h.02002v-6.63h-.02002Zm-1.30981-5.40991v12.03992h.02002v-12.03992h-.02002Zm-.28003-.28003V127.72202h.01978V34.75204h-.01978v-.00003Zm.28003,.28003v12.03992h.02002v-12.03992h-.02002Zm-.43018-16.53003v15.54993h.02002v-15.54993h-.02002Zm-3.91992-2.22998v2.22998h.02002v-2.22998h-.02002Zm126.32007,220.78992c-.23022,.52002-.56006,.98004-.96997,1.35999,.41992-.37,.75977-.82996,.98975-1.35999h-.01978Zm.41992-51.97998h.02002c.25-.56995,.61987-1.05994,1.07007-1.46008-.45996,.38013-.83008,.88013-1.09009,1.46008Zm-1.38989-1.35999c.40991,.38,.73975,.83997,.96997,1.35999h.01978c-.22998-.53003-.56982-.98999-.98975-1.35999Zm5.07983,36.70996v5.17993h.02002v-5.17993h-.02002Zm351.83008,126.94v-.01001h-.13989v1.80005h.1499v-1.79004h-.01001Zm-28.18994-80.95996v2.06h.01978v-2.06h-.01978Zm9.88989-.24005v2.30005h.02002v-2.30005h-.02002Zm18.30005,81.20001v-.01001h-.13989v1.80005h.1499v-1.79004h-.01001ZM154.91016,66.41196v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm47.07983-7.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm0-2.76001v2h.26001v-2h-.26001Zm-45.15991,34.91003c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-5.96997,13.77002v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-9.58008-7.66992v9.43994h.1001l-.1001-9.43994Zm21.92017-46.83008c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm-.28003,.78003v.20007h43.04004v-.20007h-43.04004Zm0,0v.20007h43.04004v-.20007h-43.04004Zm0,0v.20007h43.04004v-.20007h-43.04004Zm49.66016-7.47009c-1.72021,0-3.36011,.64014-4.64014,1.80005-1.26001,1.15002-2.05005,2.70996-2.21997,4.40002l-.02002,.21008h-42.5l-.01001-.22998c-.1499-3.46008-2.98999-6.18018-6.44995-6.18018h-.14014v6.41016h-1.68994v.27991h1.68994v.70007h-1.68994v.07996h1.96997v-7.19006l.25,.02002c.41016,.03003,.80005,.09009,1.18018,.19006,.17993,.04993,.35986,.09998,.53979,.18005,.19019,.04993,.37012,.12988,.54004,.21997,.17993,.07996,.3501,.16992,.51001,.27002,.12012,.06995,.22998,.13989,.34009,.21997,.32007,.21997,.61987,.46997,.88989,.75,.14014,.13989,.26001,.28003,.39014,.42993,.10986,.13,.20996,.27002,.31006,.41003v.01001c.07983,.13,.15991,.25,.23975,.38,.54004,.90991,.8501,1.97998,.8501,3.10999v1.20007h43.04003v-.77002c0-1.42004,.44995-2.72998,1.20996-3.82007,.09009-.14001,.18994-.27002,.31006-.3999v-.01001c.20996-.25,.42993-.48999,.67993-.70007,.01001,.01001,.01001,0,.02002-.01001,.48999-.44006,1.06006-.80994,1.66992-1.08997,.16016-.07007,.31006-.13,.46997-.18994,.2002-.07007,.40015-.13013,.6001-.18018,.19995-.05994,.3999-.09985,.60986-.12988,.21021-.03003,.43018-.06006,.66016-.07007l.22998-.02002h.02002v7.19006h.28003v-7.47009h-.13989v.00002Zm-49.38013,6.69006h42.47998v.70007h-42.47998v-.70007Zm27.38013,32.35999v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm.07983,7.78003v9.43994h.1001l-.1001-9.43994Zm3.61011,21.43994v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm-9.06006,89.75l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-9.03003v-5.40991l-.28003,3.37v2.03992h-2.58008l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v-.28003h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-74.56006,89.53003h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm3.09009-75.97998v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm37.41992-25.96997v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-5.51001,361.51007v.02997h15.41016v-.02997h-15.41016Zm-40.96997-248.55011l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm30.17993,27.71008c0-.03992-.17993-4.77991-2.20996-11.57996-1.16992-3.93005-2.72998-7.76001-4.62012-11.39001-2.36987-4.52002-5.25977-8.74011-8.61987-12.54004l-.07007-.06995-9.37988,4.23999-.1001-.18994-.02002-.02002c-.95996-1.92004-2.98999-3.16016-5.15991-3.16016-.86011,0-1.68994,.19006-2.46997,.56006l-.12012,.06006,2.29004,5.05005-3.48999,1.58984-.09985-.16992c-1.25-1.97998-3.17017-3.10999-5.29004-3.10999-.7002,0-1.41016,.13-2.1001,.38l-.20996,.07996-.92993-2.19006h-9.03003v-5.40991h-.01001v-.28003l.01001-5.96997v-3.85999l-.28003,4.14001v5.68994h-3.32007c-.08008,0-.15991,.01001-.22998,.03003-.25,.06006-.45996,.19995-.60986,.40991-.2002,.28003-.25,.62012-.14014,.95007l1.41992,4.29993h-4.65991l-.09009,.03003c-.02979,.02002-.10986,.06006-.22998,.1001-.10986,.05994-.25977,.11987-.44995,.19995-.03003,.02002-.05005,.03003-.07983,.04004h-.01025c-.0498,.03003-.09985,.05005-.15991,.06995-.13989,.06995-.29004,.13-.44995,.20007-.04004,.02002-.08008,.03003-.12012,.04993h-.00977c-.14014,.05994-.29004,.13-.4502,.19006-.16992,.06995-.33984,.13989-.52002,.20996h-.00977c-.22021,.09009-.4502,.17993-.7002,.28003-.11987,.05005-.25,.09998-.37988,.1499-.38013,.14014-.79004,.30005-1.22021,.45007-.27979,.10999-.56982,.21008-.86987,.31995-.07983,.03003-.16992,.06006-.25,.09009-.32007,.10999-.63989,.21997-.97998,.33997-.25,.08997-.5,.17004-.76001,.26001-1.05005,.33997-2.18994,.70007-3.40991,1.05994-.23022,.07007-.46021,.14014-.69995,.20996-1.7002,.4801-3.64014,.99011-5.76025,1.47009v.29993c.31006-.06995,.62012-.1499,.94019-.21997,.01001,0,.02002,0,.03979-.01001,.64014-.1499,1.29004-.30994,1.94019-.46997,.03003-.02002,.05981-.02002,.09985-.03003,.25-.06995,.5-.12988,.75-.19995,.26025-.07007,.53003-.14001,.79004-.20996,.22021-.07007,.4502-.13013,.66992-.19006,.02002-.00989,.04004-.00989,.06006-.0199,.18018-.05005,.36011-.1001,.54004-.15015,.06006-.02002,.13013-.03992,.18994-.04993,.01025-.01001,.02002-.01001,.02002-.01001h.01001c.02002-.01001,.04004-.02002,.06006-.02002,.20996-.05994,.42017-.12,.61987-.18005,.03027-.01001,.06006-.0199,.08008-.0199,.09009-.04004,.18018-.05994,.26001-.07996,.13013-.05005,.27002-.09009,.40015-.12012,.02002-.01001,.04004-.02002,.06006-.02002,.25-.07996,.5-.15991,.73975-.22998,.11011-.04004,.22998-.07996,.34009-.10986,.26001-.09009,.52002-.17017,.77002-.25,.09985-.03003,.19995-.07007,.30005-.1001,.01001,0,.02002-.01001,.03003-.01001,.34985-.12,.68994-.22998,1.01001-.33997,.32983-.12,.6499-.2301,.95996-.32996,.00668-.00667,.01335-.01001,.02002-.01001,.08008-.03003,.16992-.06006,.25-.09009,.2998-.10999,.58984-.21997,.86987-.31995,.14014-.04993,.28003-.09998,.40991-.15002,.29004-.10999,.56006-.20996,.81006-.30005,1.15015-.43994,2.05005-.81995,2.66016-1.07996,.23999-.10999,.42993-.19006,.58008-.25,.06982-.03992,.13989-.05994,.18994-.08997l.06006-.03003c.01978-.01001,.03979-.01001,.05981-.02002l.04004-.02002h16.61987l.81006,1.89014,15.43994,38.17993,.02002-.01001v.01001l.81006-.33008,1-.40991,14.56006-5.90002,.85986,2.08997-2.06982,.79004-1.68994,.6499-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002h-.02002c-.04004,.01001-.10986,.05994-.21997,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995,11.27002-4.30005,.09985-.04004-.01001-.09998Zm-54.48999-32.46008l-1.45996-4.38989c-.07983-.23999-.04004-.48999,.11011-.69995,.1499-.20007,.37988-.32007,.62988-.32007h3.30005v5.40991h-2.58008Zm-20.07007,121.99011h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm4.72998-124.21002l.10986,.13c11.08008,12.63,14.09009,26.58008,14.88013,31.98999l.01978,.17993-.67993,.28003-2.83984-6.85999h-1.61011l-6.83984-15.94006,1.97998-.66992-.03003-.13c-.01001-.02991-.81006-3.0199-5.07007-7.38l-.07007-.07007-8.55005,3.78003-.54004-1.13989,9.24023-4.17004Zm-14.77002,6.46008l.42993,.93994-.25,.12988-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009-1.33008,.63-.36987-.72009c0-.00989,0-.0199-.01001-.02991l-.10986-.22009,3.45996-1.56982Zm3.97998,36.30994l-15.18994-37.55005,.22998-.07996c.63989-.22998,1.2998-.3501,1.95996-.3501,2.26001,0,4.29004,1.3501,5.43994,3.62012l.47998,.95996,1.58008-.73999,1.81006-.8501,.50977-.23999-2.83984-6.26001,.21997-.08984c.63989-.26001,1.31006-.38013,2-.38013,2.07007,0,3.98999,1.18005,4.90991,3l.26001,.52002-.03979,.03003,.61987,1.31006,8.63013-3.80005,.10986,.10999c3.18994,3.30994,4.3501,5.79993,4.69995,6.72009l.08008,.22998-2.02002,.67993,7.03003,16.39001h1.62012l2.75977,6.69006-24.85986,10.07996Zm16.48999-6.38l9.34985-3.80005,.04004,.30005c.03003,.20996,.05005,.3999,.07007,.57996l.02002,.18005-9.1001,3.65991-.37988-.91992Zm.86011,2.09998l-.38013-.92004,9.03003-3.62988,.03003,.30994c.03003,.35999,.05005,.60999,.05981,.72998l.01025,.17004-8.75,3.33997Zm-21.15015-30.96008l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm3.09009-75.97998v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.28003v-1.64014h-.28003Zm37.41992-25.96997v2h.26001v-2h-.26001Zm0,2.76001l-.01001,2v.01001h.27002v-2.01001h-.26001Zm-5.51001,361.51007v.02997h15.41016v-.02997h-15.41016Zm400.66016-72.79004v1.79004h.1499v-1.79004h-.1499ZM202,58.66196l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm.01001,2.77002l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm-42.19995,25.61011v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.02002v-1.64014h-.02002Zm-9.65991-15.44995v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001h21.57007v.00002Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.0901s-11.27002,0-11.27002,0Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.02002v-1.64014h-.02002Zm-9.65991-15.44995v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm1.91992,24.39001c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm-.07983-7.78003v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm4.80005,7.31006v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.02002v-1.64014h-.02002Zm-9.06006,89.75l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm0,0l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm17.11011,32.5l-7.70996,2.94006-.23022,.08997-.12988,.05005-2.07007,.79004-.10986,.04004-.24023,.08984-2.30981,.88013-.02002,.01001-1.71997,.6499-16.56006-40.32996h-14.21997l-.09009,.02002c-.04004,.0199-.11987,.05994-.23999,.12-.04004,.02002-.09009,.04004-.13989,.06006-.2002,.08984-.47021,.21997-.82007,.36987-.20996,.1001-.43994,.20007-.69995,.30005-.28003,.12-.58008,.25-.91016,.38-.09985,.04993-.20996,.08997-.31982,.13-.13013,.06006-.26001,.10999-.40015,.15991-.18994,.08008-.38989,.15015-.58984,.2301-.07007,.02991-.14014,.05994-.21021,.07996-.1499,.06006-.30981,.12012-.46973,.18005-.16016,.05994-.32007,.12-.49023,.18005-.1499,.05994-.2998,.11987-.45996,.16992-.16992,.06006-.33984,.12-.52002,.17993-.02002,.01001-.02979,.02002-.0498,.02002-.33008,.12012-.68018,.23999-1.03027,.36011-.12988,.04993-.25977,.08997-.38989,.12988-.07983,.03003-.15991,.06006-.23999,.08008-.18994,.07007-.38989,.13-.58984,.18994-.47021,.16003-.9502,.31006-1.4502,.45996-.31982,.1001-.6499,.20007-.97998,.30005-.08008,.02002-.1499,.05005-.22998,.07007-.41992,.11987-.85986,.25-1.31006,.36987-.21997,.07007-.43994,.13013-.65991,.19006h-.02002c-.21997,.05994-.44995,.12-.67993,.18005-.01001,.01001-.02002,0-.02002,0-.12988,.04004-.26001,.07996-.3999,.10999-.1001,.02991-.2002,.04993-.31006,.07996-.25,.06006-.5,.13-.76001,.18994-.23999,.06006-.48999,.12012-.73999,.18018h-.02002c-.2002,.04993-.39014,.08984-.59009,.13989-.05981,.01001-.11987,.03003-.17993,.04004v.29004l.21997-.05005h.02002v112.97998h-.21997v.28003h.5v-113.33008l.17993-.03992c.58008-.14001,1.13989-.28003,1.67993-.41003l.29004-.08008v92.18011h2.16992v3.75h-2.16992v18.02997h-2.10986v1.92999l-2.31006,.32001v12.47998l11.41992-1.88,.68018,2.82001-5.96021,.76001,.03003,.29004,.21997-.03003,.05005,.20001c.62012,2.78998,3.05005,4.73999,5.89014,4.73999,1.45996,0,2.85986-.53003,3.96997-1.47998,1.08984-.94,1.80981-2.23004,2.03979-3.64001l.42017-.09998c1.13988,1.56995,2.96996,2.50995,4.89989,2.50995,3.36011,0,6.08008-2.72998,6.08008-6.07996,0-.35004-.04004-.73004-.11987-1.15002l-.04004-.20001,.19995-.06c6.69995-2.23999,16.86987-6.04999,27.25-11.5l.07983-.03998v-81.38l8.68018-3.31995v-.30005l-1.70996,.6499Zm-61.49023,84.74011h4v3.83997h-4v-3.83997Zm21.07007,18.34998c-2.27002,0-4.34009-1.34003-5.27002-3.40997l-.34985-.78003,.08008,.84998c.00977,.10004,.00977,.17004,.00977,.26001,0,3.20001-2.59985,5.79004-5.7998,5.79004-2.68018,0-4.97998-1.82001-5.6001-4.44l-.06006-.25,5.78003-.73999-.81006-3.38-11.35986,1.87v-11.91003l2.03003-.26996v2.17999h4.56006v-4.40002h-2.17017v-17.75h2.17017v-4.31h-2.17017v-91.96991l.17017-.05005c8.1499-2.15002,13.30981-4.6001,13.86987-4.87012l.05005-.0199h14l16.59985,40.42004,4.65015-1.77002v77.76996l-.13013,.07001c-1.26001,.70001-12.87988,7.01996-31.18994,12.31l-.15015,.03998,1.26025,3.41003,.12988-.03003c.01001-.01001,1.91016-.52997,5.1001-1.58002l.25977-.08997,.04004,.26996c.07007,.37006,.1001,.68005,.1001,.99005,0,3.19-2.6001,5.78998-5.80005,5.78998h-.00002Zm33.17017-18.90997l-.13013,.06995c-15.17993,7.92004-29.71997,12.30005-32.48999,13.09003l-.20996,.06-1.06006-2.88,.23999-.07001c19.02002-5.53998,30.58008-12.06,31.07007-12.33997l.06982-.04004v-78.04004l2.51025-.95996v81.11005Zm-10.45996-221.88007v-.28003h-14.99023l-6.62988,.03003v53.69006l9.55005-.06995v1.33984s-.03003,0-.09009,.01001c-.02002,0-.05005,0-.07007,.01001-.15991,.01001-.42993,.05005-.76978,.13013-.08008,.02002-.16016,.03992-.25,.05994,.30981-.06995,.62988-.10999,.94971-.12h.38013v-1.54004h-9.6499v-53.26001s21.57007,0,21.57007,0Zm3.68994,29.21997v-4.34985s-.07007-.01001-.2002-.03003v4.6499h1.06006v.02002h10.28003v31.52002h-33.30005l.02002-.25c.14014-2.25,1.4502-4.17993,3.32007-5.19995-.11987,.05994-.25,.11987-.36987,.18994-.17017,.09009-.34009,.19995-.51025,.31006-.25977,.16992-.50977,.35999-.75,.57996-.08984,.07996-.17993,.17004-.25977,.25-.08008,.07996-.16016,.16003-.22998,.25-.21021,.22009-.40015,.47998-.56006,.75-.08008,.12-.16016,.25-.22021,.39001-.0498,.08008-.08984,.16992-.11987,.26001-.05005,.08997-.09009,.17993-.11987,.28003-.04004,.07996-.07007,.16992-.1001,.27002-.21997,.63989-.34009,1.36987-.34009,2.19995h33.67017v-32.09009h-11.27002Zm-1.77002-4.82996c-.15015-.05994-.30005-.12-.45996-.19995-.59009-.26001-1.22021-.63-1.79004-1.13l-.07007-.07007c-.08008-.06995-.15991-.1499-.22998-.21997-.11011-.10999-.20996-.21997-.30005-.33997-.10986-.12-.20996-.26001-.30005-.39001v-.01001c-.08984-.12-.16992-.25-.23999-.38-.02002-.03992-.04004-.07996-.06006-.12-.06982-.12-.12988-.23999-.17993-.37-.03003-.06995-.05981-.14001-.09009-.21997-.03979-.09998-.07983-.20007-.10986-.30005,0-.00989-.01001-.02991-.01001-.03992-.05005-.15015-.09009-.30005-.11011-.45007-.0498-.17004-.07983-.34998-.09985-.52991-.02002-.13013-.03003-.26001-.04004-.39014-.01001-.12988-.02002-.27002-.02002-.40991v-.1001h2.38013v-.27002h-2.66016v.14014c0,2.86987,2,5.29004,4.70996,5.91992-.09985-.04004-.20996-.07996-.31982-.12Zm-1.84009-16.60999v9.43994h.1001l-.1001-9.43994Zm.52002,97.41992l-.04004,.02002h-.02002l-.17993,.09009-.05005,.02002-.1499,.06995-.11011,.04993h-.01001l-1.26001,.59009,.12012,.26001,1.81006-.8501-.11011-.25Zm4.28003-90.10986v2h.12988v-2h-.12988Zm4.78003,.35986v1.64014h.02002v-1.64014h-.02002Zm37.42993-23.19995l-.02002,1.98999v.01001h.27002v-2h-.25Zm-.01001-2.77002v2h.26001v-2h-.26001Zm-5.51001,364.27008v.02997h15.41016v-.02997h-15.41016Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M676.10986,207.90195v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-26.28003-1.59009v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm-.48999,3.09009c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-4.80005-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm6.32983-5.84009v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-26.28003-1.59009v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm-.48999,3.09009c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-4.80005-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm6.32983-5.84009v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-26.28003-1.59009v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm-.48999,3.09009c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm1.00977-5.84009v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-26.28003,1.36987h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008v2.95996Zm.23999-2.71997h8.61011v2.51001h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999Zm8.12012,5.6001c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm32.09985,174.53998l-14.13989-344.26996-.02002-.36011h-6.96997v6.91003l3.34985,.25,6.24023,155.37h-2.64014v1.20996h-16.67993v-1.20996h-10.11011v1.20996h-22.6499v-.94995h-2.30005v-21.42993h-5.03003v4.09985l1.12012-.03992v21.28003h6.20996v-1.31995h22.6499v1.13989h3.91992v2.19995c-.11987-.03992-.23975-.06995-.36987-.06995-.6001,0-1.1001,.49011-1.1001,1.08997,0,.61011,.5,1.1001,1.1001,1.1001,.59985,0,1.09985-.48999,1.09985-1.1001,0-.34985-.17993-.6499-.43994-.84985h4c-.26001,.19995-.43994,.5-.43994,.84985,0,.61011,.5,1.1001,1.1001,1.1001,.60986,0,1.09985-.48999,1.09985-1.1001,0-.59985-.48999-1.08997-1.09985-1.08997-.12012,0-.24023,.03003-.36011,.06995v-2.17993h1.6001v-1.15991h16.67993v.80994l1.08984,1.08997v1.41003c-.06982-.02002-.12988-.04004-.19971-.04004-.61011,0-1.1001,.49011-1.1001,1.08997,0,.61011,.48999,1.1001,1.1001,1.1001,.59985,0,1.09985-.48999,1.09985-1.1001,0-.28003-.11987-.53003-.29004-.71997h1.19995l1.51001,37.60004h-1.53979v16.27002h.6499v3.76996h1.68994l1.1001,27.41003,.06006,1.62,1.11987,27.79999h-7.45996v39.08002h9.03003l.72998,18.07996-18.07007-.08997,3.67017,18.39001h3.13989l-3.58008-16.15002,14.92993,.07001v1.76001h4.30005Zm-13.3999-22.81v-37.58002h6.73999l1.51001,37.58002h-8.25Zm3.48999-98.92999h.79004l.02002,.5,.09985,2.51996h-.90991v-3.01996Zm-.6499-7.96002h1.11987l.28003,6.83997,.01001,.37006h-1.40991v-7.21002Zm0-.75v-6.81h.81982l.27002,6.81h-1.08984Zm-53.81006-50.64001v.19995h-.38013v1.64014h.38013v.56995h-4.70996v-21.30994l-1.12012,.03992v-2.56995h3.53003v21.42993h2.30005Zm23.3999,.94995v.14014h-22.6499v-.14014h22.6499Zm3.55005,4.91003c.18994,0,.34985,.15002,.34985,.33997,0,.19006-.15991,.3501-.34985,.3501s-.3501-.16003-.3501-.3501c0-.18994,.16016-.33997,.3501-.33997Zm-2.80005-3.63v-2.48999h8.61011v2.51001h-1.6001v2.3501h-3.09009v-2.37012h-3.91992Zm8.12012,4.32007c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm17.91992-5.6001v.14014h-16.67993v-.14014h16.67993Zm.89014,4.91003c.18994,0,.34985,.15002,.34985,.33997,0,.19006-.15991,.3501-.34985,.3501-.19019,0-.3501-.16003-.3501-.3501,0-.18994,.15991-.33997,.3501-.33997Zm-.14014-3.5199v-2.6001h1.91992l.2002,4.98999h-1.03027v-1.30005l-1.08984-1.08984Zm-6.94995-165.13013h5.5l14.09985,343.13007h-2.77002v-1.76001l-16.60986-.08002,3.58008,16.16003h-1.6001l-3.35986-16.89001,17.92993,.09998-13.44019-334.62-.00977-.33008-3.32007-.23999v-5.46997Zm-11.71997,168.13013c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-8.36011-7.05005v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm.51978-1.54004v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-17.91992,4.25c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-8.36011-7.05005v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm.51978-1.54004v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-22.71997,4.44995l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm5.32007-1.20996c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-8.36011-7.05005v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm.51978-1.54004v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-22.71997,4.44995l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-26.42993-5.84009v.62012h23.10986v-.62012h-23.10986Zm22.87988,.38013h-22.6499v-.14014h22.6499v.14014Zm.51001-1.59009v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm-.48999,3.09009c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm1.00977-5.84009v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M699.57007,297.72202l.05981,1.62h.03027v-1.62h-.09009Zm-3.17017-31.69v-.61005h-.27979v.89001h1.05981v-.27997h-.78003Zm-21.2998-53.49994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm24.46997,83.75l.05981,1.62h.03027v-1.62h-.09009Zm-2.79004-30.76001v.08002h.28003v-.08002h-.28003Zm-.38013-.92999v-.61005h-.27979v.89001h1.05981v-.27997h-.78003Zm-21.2998-53.49994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm24.46997,83.75l.05981,1.62h.03027v-1.62h-.09009Zm-1.30005-32.30005l.02002,.55005v-.55005h-.02002Zm-1.87012,.61005v-.61005h-.27979v.89001h2.16992v-.27997h-1.89014Zm-21.2998-53.49994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm24.46997,83.75l.05981,1.62h.03027v-1.62h-.09009Zm-1.28003-31.75v-.55005h-.02002l.02002,.55005Zm-1.89014,.06v-.61005h-.27979v.89001h2.16992v-.27997h-1.89014Zm-21.2998-53.49994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm31.85986,174.07996l-14.13989-344.03992v-.13013h-6.52002v6.46008l3.34009,.25,6.25977,155.81995h-2.6499v1.20996h-17.14014v-1.20996h-9.6499v1.20996h-23.10986v-.93994h-2.30005v-21.43994h-4.56006v3.62988l1.11987-.03992v21.27991h5.74023v-1.30994h23.10986v1.14001h3.91992v2.54004l.06006-.17004h4l.07007,.20007v-2.55005h1.59985v-1.16003h17.14014v.94006l1.09009,1.08997v1.78992l-.28003-.04993c-.03003-.01001-.06006-.02002-.09009-.02991-.02002,0-.05005-.01001-.05981-.01001-.48022,0-.86011,.38989-.86011,.85986,0,.47998,.37988,.86011,.86011,.86011,.46973,0,.85986-.38013,.85986-.86011,0-.26001-.12012-.44995-.22998-.55994l.17993-.40002h1.42017l1.52979,38.08002h-1.5498v15.79999h2.18994l.13989,3.48999h-1.38989v-2.83997h-.28003v3.12h1.67993l1.11011,27.64001,.05981,1.62,1.13013,28.02997h-7.47998v38.61005h9.03003l.73999,18.56-18.02002-.10004,3.57007,17.92999h2.65991l-3.58008-16.15997,15.46021,.07001v1.76996h3.81982Zm-63.88989-180.43005h-.39014v1.18005h.39014v1.03003h-5.17993v-21.28992l-1.12012,.03992v-3.05994h4v21.43994h2.30005v.65991Zm23.38989,.90015h-23.10986v-.62012h23.10986v.62012Zm9.36011,1.15991h-1.59009v2.3501h-3.56982v-2.38013h-3.92017v-2.95996h9.08008v2.98999Zm17.42993-1.15991h-17.14014v-.62012h17.14014v.62012Zm.66016,5.44995c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm.70996-1.82007v-1.43994l-1.09009-1.09009v-2.92993h2.38013l.21973,5.45996h-1.50977Zm1.77979,38.64008h1.28003l.29004,7.27997h-1.57007v-7.27997Zm1.89014,15.23999h-1.89014v-7.67999h1.59009l.28003,7.06995,.02002,.55005v.06Zm-4.71997,99.66998v-38.03998h7.19995l1.53003,38.03998h-8.72998Zm-6.23999,20.22998l3.58008,16.16003h-2.08008l-3.45996-17.35999,17.96997,.08997-13.42017-334.5-3.33984-.23999v-5.92004h5.96997l14.11987,343.61004h-3.25v-1.77002l-16.08984-.07001Zm-12.22998-173.3999c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm21.2998,52.06v-.61005h-.27979v.89001h2.16992v-.27997h-1.89014Zm1.87012-.61005l.02002,.55005v-.55005h-.02002Zm1.30005,32.30005l.05981,1.62h.03027v-1.62h-.09009Zm-24.46997-85.18994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm21.2998,52.06v-.61005h-.27979v.89001h1.05981v-.27997h-.78003Zm3.17017,31.69l.05981,1.62h.03027v-1.62h-.09009Zm-24.46997-85.18994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm21.2998,52.06v-.61005h-.27979v.89001h1.05981v-.27997h-.78003Zm.38013,.92999v.08002h.28003v-.08002h-.28003Zm2.79004,30.76001l.05981,1.62h.03027v-1.62h-.09009Zm-24.46997-85.18994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm21.2998,52.06v-.61005h-.27979v.89001h1.05981v-.27997h-.78003Zm.38013,.92999v.08002h.28003v-.08002h-.28003Zm2.79004,30.76001l.05981,1.62h.03027v-1.62h-.09009Zm-24.46997-85.18994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm-4.80005-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M586.37988,134.21201v41.13h1.25v-41.13h-1.25Zm.97021,40.84998h-.68994v-40.55994h.68994v40.55994Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={246.35805}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={246.59254}
              y={210.67435}
              width={3.23996}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={256.26086}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={256.49539}
              y={210.67435}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={265.96985}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={266.20435}
              y={210.67435}
              width={3.24094}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={275.87387}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={276.10843}
              y={210.67435}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={285.6478}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={285.88232}
              y={210.67435}
              width={3.23996}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={295.5499}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={295.78442}
              y={210.67435}
              width={3.24088}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={305.26083}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={305.49533}
              y={210.67435}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={315.16388}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={315.39844}
              y={210.67435}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={324.42194}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={324.65643}
              y={210.67435}
              width={3.24094}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={334.32477}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={334.5593}
              y={210.67435}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={344.03372}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={344.26825}
              y={210.67435}
              width={3.24088}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={353.93777}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={354.17227}
              y={210.67435}
              width={3.24094}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M568.6001,317.19199v1.94h10.61987v-1.94h-10.61987Zm.75,1.19v-.44h9.11987v.44h-9.11987Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M568.84009,317.43198v1.47003h10.13989v-1.47003h-10.13989Zm9.85986,1.19h-9.57983v-.90997h9.57983v.90997Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={363.19583}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={363.43033}
              y={210.67435}
              width={3.23996}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={373.09866}
              y={210.4398}
              width={3.71021}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={373.33319}
              y={210.67435}
              width={3.24112}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={382.80859}
              y={210.4398}
              width={3.70923}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={383.04321}
              y={210.67435}
              width={3.24005}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={392.71289}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={392.94748}
              y={210.67435}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={401.9697}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={402.20428}
              y={210.67435}
              width={3.24084}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={411.87375}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={412.10828}
              y={210.67435}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={421.58273}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={421.81735}
              y={210.67435}
              width={3.24078}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={431.48581}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={431.7204}
              y={210.67435}
              width={3.24078}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={440.74457}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={440.97913}
              y={210.67435}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={450.64764}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={450.88217}
              y={210.67435}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={460.3576}
              y={210.4398}
              width={3.70923}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={460.59219}
              y={210.67435}
              width={3.24005}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={470.26068}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={470.49524}
              y={210.67435}
              width={3.23981}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={480.29263}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={480.52719}
              y={210.67435}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={490.19571}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={490.4303}
              y={210.67435}
              width={3.23981}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={499.90469}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={500.13928}
              y={210.67435}
              width={3.24078}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={509.80774}
              y={210.4398}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={510.04233}
              y={210.67435}
              width={3.24088}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={519.77673}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={520.01129}
              y={210.67435}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={529.67957}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={529.91412}
              y={210.67435}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={539.38953}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={539.62402}
              y={210.67435}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={549.2926}
              y={210.4398}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={549.52716}
              y={210.67435}
              width={3.23981}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M600.05841,207.1748c0-.39893-.32324-.72192-.72217-.72192-.39795,0-.72192,.323-.72192,.72192s.32397,.72192,.72192,.72192c.39893,0,.72217-.323,.72217-.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M599.33624,207.66217c-.26874,0-.48737-.21864-.48737-.4874s.21863-.4873,.48737-.4873c.26892,0,.48761,.21857,.48761,.4873s-.21875,.4874-.48761,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M614.92096,190.83229c.39893,0,.72192-.323,.72192-.72192,0-.39905-.323-.72205-.72192-.72205-.39819,0-.72192,.323-.72192,.72205,0,.39893,.32373,.72192,.72192,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M614.92096,190.59773c-.26874,0-.48737-.21864-.48737-.4874,0-.26881,.21863-.48747,.48737-.48747s.4873,.21864,.4873,.48747c0,.26874-.21857,.4874-.4873,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M617.87238,190.83229c.39917,0,.72217-.323,.72217-.72192,0-.39905-.323-.72205-.72217-.72205-.39795,0-.72192,.323-.72192,.72205,0,.39893,.32397,.72192,.72192,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M617.87238,190.59773c-.26874,0-.48737-.21864-.48737-.4874,0-.26881,.21863-.48747,.48737-.48747,.2688,0,.48755,.21864,.48755,.48747,0,.26874-.21875,.4874-.48755,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M636.72534,212.22437c.39893,0,.72192-.323,.72192-.72192,0-.39905-.323-.72205-.72192-.72205-.39795,0-.72217,.323-.72217,.72205,0,.39893,.32422,.72192,.72217,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M636.72534,211.98979c-.26892,0-.48761-.21864-.48761-.4874,0-.26881,.21875-.48747,.48761-.48747,.26874,0,.48737,.21864,.48737,.48747,0,.26874-.21863,.4874-.48737,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M601.2276,239.11838c0,.39893,.32397,.72192,.72192,.72192,.39893,0,.72217-.323,.72217-.72192s-.32324-.72192-.72217-.72192c-.39795,0-.72192,.323-.72192,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M601.94952,239.60571c-.26874,0-.4873-.21857-.4873-.4873s.21857-.4874,.4873-.4874c.26892,0,.48761,.21864,.48761,.4874s-.21875,.4873-.48761,.4873Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M641.69312,184.91701c.39893,0,.72192-.323,.72192-.72192,0-.39905-.323-.72205-.72192-.72205-.39795,0-.72217,.323-.72217,.72205,0,.39893,.32422,.72192,.72217,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M641.69318,184.68245c-.26892,0-.48761-.21864-.48761-.4874,0-.26881,.21875-.48747,.48761-.48747,.26874,0,.4873,.21864,.4873,.48747,0,.26874-.21857,.4874-.4873,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={621.1106}
              y={188.49548}
              width={0.28088}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M514.1001,14.99203v2h9.95996v-2h-9.95996Zm9.67993,1.71997h-9.40015v-1.43994h9.40015v1.43994Z"
              style={{ fill: "#3d3f42" }}
            />
          </G>
          <G>
            <Path
              d="M225.33008,15.03876v2.19995h253.42993v-2.19995H225.33008Zm253.1499,1.91992H225.60986v-1.62988h252.87012v1.62988Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M191.98999,11.8288v5.40991h31.88989v-5.40991h-31.88989Zm31.61011,5.12988h-31.33008v-4.83984h31.33008v4.83984Zm-31.61011-5.12988v5.40991h31.88989v-5.40991h-31.88989Zm31.61011,5.12988h-31.33008v-4.83984h31.33008v4.83984Zm-31.61011-5.12988v5.40991h31.88989v-5.40991h-31.88989Zm31.61011,5.12988h-31.33008v-4.83984h31.33008v4.83984Zm-31.61011-5.12988v5.40991h31.88989v-5.40991h-31.88989Zm31.61011,5.12988h-31.33008v-4.83984h31.33008v4.83984Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M603.67993,213.26874c-.10986,0-.20996,.04004-.30981,.13l-.02002-.0199-.09009,.1499c-.05005,.09009-.07007,.16003-.07007,.22998,0,.27002,.22021,.48999,.48999,.48999,.27002,0,.48999-.21997,.48999-.48999s-.21997-.48999-.48999-.48999Zm6.90015-120.1499v-.73999h-8.34009V45.27875h-5.76001v1.48999h1.18994v3.34009h1.93994l.21021,43.07996h-1.55005v.27991h1.55005l.01001,1.69006h-9.15015v-.34998c0-3.53003-2.86987-6.41003-6.40991-6.41003h-1.26001V47.20868l-.58008-1.61987v-7.63013h-.13989c-4.43018,0-8.03003,3.6001-8.03003,8.02002v.69006h-8.65015v-11.15002l-17.36987-.52002v-2.26001h-3V14.00877l-40.34985-.00004v.28003h40.06982v1.45996h-15.71997v2.27002h-2.02002l-.44995-.43994h-13.79004v-1.83008h-8.08984v.28003h7.80981v1.83008h13.96021l.43994,.43994h7.95996l-.01001,.25c-.08234,2.75806-2.42908,5.06855-5.36011,5.17993l.01001,.29004c2.96021,.12012,5.34009,2.56006,5.36011,5.55005v.22998h-8.26001v5.83008h-3.15015v6.0199h10.67017v9.07235h.13989c2.53003,0,4.78003-1.60986,5.6001-4l.22113-.88074,.21881,.87073c.91016,2.40015,3.25,4.01001,5.81006,4.01001h.13989v-7.16992h2.65015v7.03003h.13989c2.45996,0,4.67993-1.56006,5.52002-3.88l.21265-.88816,.22729,.88816c.87012,2.31995,3.11011,3.88,5.58008,3.88h.13989v-9.80245h1.93994l.01025,75h25.43994l-.01001,.23999c-.13989,4.23999-3.57007,7.56006-7.80005,7.56006h-1.20996v7.97997l-.25-.01001c-3.05005-.20996-5.43994-2.76001-5.43994-5.82007v-.72998h-10.77002v61.18005h18.69995v-1.53992c0-3.15015,2.45996-5.77002,5.59009-5.97009l.25-.02002v7.53003h1.68994v-61.72998h-9.48999v-.58997h.92993c2.10986,0,4.12012-.82007,5.64014-2.30005,1.50977-1.46997,2.37988-3.44995,2.43994-5.56006l.01001-.21997h.01001v-8.82996h11.29004l.20996,43.52991h-1.97021v4.42004h1.99023l.07983,16.03003-.43994,.10999c-.09009-.15991-.25-.26001-.41992-.26001-.27002,0-.48999,.21997-.48999,.48999s.21997,.48999,.48999,.48999c.17993,0,.32983-.09998,.41992-.27002l.43994,.11011,.05005,8.92993-.45996,.08008c-.07007-.19006-.25-.32007-.44995-.32007-.27002,0-.48999,.21997-.48999,.48999s.21997,.48999,.48999,.48999c.19995,0,.37988-.12988,.44995-.32996l.45996,.07996,.04004,9.17004-.46997,.01001c0-.27002-.21997-.47009-.47998-.47009-.27002,0-.48999,.21008-.48999,.47998,0,.27002,.21997,.49011,.48999,.49011,.26978,0,.47998-.21008,.47998-.4801l.46997,.01001,.08984,18.06006h-36.67993v2.48999h-3.55981v.28003h3.55981v2.12h35.42017l-.2002,.34998c-.04004,.09009-.06982,.16003-.06982,.22998,0,.27002,.21997,.48999,.48999,.48999,.26978,0,.48999-.21997,.48999-.48999,0-.06995-.02002-.13989-.07007-.22998l-.19995-.34998h1v8.18005h.28003v-8.18005h2.1499v-4.89001h-.01001v-.46997l.39014-.17993c.06982,.05994,.16992,.12988,.30981,.12988,.27002,0,.48999-.21997,.48999-.48999s-.21997-.48999-.48999-.48999c-.10986,0-.20996,.04004-.30981,.12l-.38013-.18005,.04004-17.58984h2.94995v-3.47009h-3.73999V93.11884h8.34009Zm-47.47021,32.1599h4.38013v25.6001h-.75v-24.40015h-2.16992v24.40015h-1.46021v-25.6001Zm3.3501,1.47998v24.12012h-1.6001v-24.12012h1.6001Zm-3.3501,24.40002h4.38013v3.55994h-4.38013v-3.55994Zm3.3501,3.89001v29.10999h-1.6001v-29.13l1.6001,.02002Zm14.79004,30.84998h-18.14014v-30.90002h1.47021v29.44006h2.15991v-29.44006h.75v29.44006h13.76001v1.45996Zm6.1001-7.5199l-.22021,.0199c-3.0498,.18005-5.5,2.52002-5.83984,5.55005l-.02002,.20996h-13.5v-24.91003h.39014c3.05981,0,5.59985-2.38989,5.78979-5.43994l.01001-.21997h11.12012v21.56995h-9.32007v1.54004h11.59009v1.68005Zm.52002-53.65015h.90991v61.17004h-1.13013v-7.5199h-.02002v-1.96008h-11.58984v-.97998h9.31982v-22.13h-11.3999v-1.07007h11.41992v-17.94995h-9.59985v-.70996h12.09009v-8.8501Zm-.28003,0v8.57007h-12.1001v1.28003h9.61011v17.37988h-11.42017v1.49011c0,3.03992-2.47998,5.5199-5.51978,5.5199h-.39014v-33.68994h5.55005v.44995c0,3.37012,2.73999,6.11011,6.10986,6.11011h.14014v-7.11011h8.02002Zm11.72998-29.28992l.35986,1.64001h-10.65991l-.19995-1.64001h10.5Zm-51.36011-62.42004v1.43005h-12.22998v-1.43005h12.22998Zm-4.63989-16.67993l1.63989-.28003v16.18994l-1.63989,.36011V16.33881Zm-1.90991,0l1.62988-.28003v16.18994l-1.62988,.36011V16.33881Zm-1.92017,0l1.63013-.28003v16.18994l-1.63013,.36011V16.33881Zm-1.91992,0l1.63989-.28003v16.18994l-1.63989,.36011V16.33881Zm-7.88013,13.73999h5.65015v-.47998c.11151-3.25973-2.57397-5.70584-4.8269-5.70584,0,0,4.6239-.37244,4.8269-5.73423v-.14001h-5.82007v-1.98999h7.77002v16.70996h-1.84009v1.88013l-5.76001-.17004v-4.37Zm33.16992,10.41992h-2.21973v9.80245l-.25-.02002c-2.96021-.19995-5.28027-2.67993-5.28027-5.6499v-.27002h-.27979v.33997c0,2.93005-2.28003,5.38-5.2002,5.57996l-.25,.02002v-7.03003h-3.20996v7.17004l-.25-.01001c-3.10986-.21008-5.54004-2.80994-5.54004-5.92004v-.07996h-.27979v.37c0,2.94995-2.31006,5.41992-5.25,5.63l-.25,.01001,.00977-10.28243h-5.06982v-2.81995h33.31982v3.15991Zm25.46021,75h-25.17017v-19.31995h1.2002l.09985,17.90002h22.67017v-18.18005h-23.97021V37.05878h-33.88989v3.38h5.06006v.93005h-10.39014v-5.46008h3.15015v-5.82996h2.33008v4.6499l35.91992,1.06006v11.16003h1.36987v48h21.62012v20.54994Zm-23.69019-19.31995h22.21021v17.62h-22.11011l-.1001-17.62Zm2.3501-1.51001V46.94879h7.56006v-.97009c0-4.12988,3.22998-7.52991,7.35986-7.72998l.25-.02002v7.3501l.58008,1.62v41.47998h1.54004c3.22998,0,5.91992,2.52991,6.12012,5.73999l.02002,.25h-23.43018v-.00002Zm22.04004,12l-.19995-1.63h10.5l.35986,1.63h-10.65991Zm0-1.92004l-.19995-1.62988h10.5l.35986,1.62988h-10.65991Zm0-1.90991l-.19995-1.64001h10.5l.35986,1.64001h-10.65991Zm0-1.92004l-.19995-1.64001h10.5l.35986,1.64001h-10.65991Zm0-1.92004l-.19995-1.63989h10.5l.35986,1.63989h-10.65991Zm13.67993,113.90002h-38.70996v-4.32996h38.70996v4.32996Zm3-26.94006v2.89014h-2.94995l-.05005,19.42993h-2.03979l-.26025-53.66992h-1.98975v-3.84009h1.96973l-.48975-100.94995h-1.94019v-3.34009h-1.18994v-.90991h5.19995V185.95868h3.73999v.00002Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M230.19995,266.77875v4.07001h4.36011v-4.07001h-4.36011Zm.75,3.32001v-2.57001h2.86011v2.57001h-2.86011Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M230.42993,267.00879v3.59998h3.89014v-3.59998h-3.89014Zm3.61011,3.32001h-3.33008v-3.04004h3.33008v3.04004Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M230.19995,150.83881v4.06995h4.36011v-4.06995h-4.36011Zm.75,3.31995v-2.56995h2.86011v2.56995h-2.86011Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M193.37012,74.18878v3.16003h7.96997v-3.16003h-7.96997Zm7.68994,2.87h-7.41016v-2.59009h7.41016v2.59009Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M138.60986,47.41877v2.26001h19.58008v-2.26001h-19.58008Zm19.30029,1.97998h-19.02002v-1.69995h19.02002v1.69995Zm-19.30029-1.97998v2.26001h19.58008v-2.26001h-19.58008Zm19.30029,1.97998h-19.02002v-1.69995h19.02002v1.69995Zm-19.30029-1.97998v2.26001h19.58008v-2.26001h-19.58008Zm19.30029,1.97998h-19.02002v-1.69995h19.02002v1.69995Zm-19.30029-1.97998v2.26001h19.58008v-2.26001h-19.58008Zm19.30029,1.97998h-19.02002v-1.69995h19.02002v1.69995Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M130.80005,419.76874v8.18005h31.29004v1.13h4.34985v-9.31006h-35.63989Zm35.36011,9.03003h-3.79004v-1.13h-31.29004v-7.62h35.08008v8.75Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M342.1499,425.47876v3.98999h64.57007v1.04999h4.04004v-1.04999h55.05005v1.04999h4.0498v-1.04999h55.03027v-3.98999h-182.74023Zm68.33008,4.76001h-3.47998v-3.47998h3.47998v3.47998Zm59.09009,0h-3.47998v-3.47998h3.47998v3.47998Zm55.03979-1.04999h-54.75v-2.71002h-4.0498v2.71002h-55.05005v-2.71002h-4.04004v2.71002h-64.29004v-3.42004h182.17993v3.42004Zm-182.45996-3.71002v3.98999h64.57007v1.04999h4.04004v-1.04999h55.05005v1.04999h4.0498v-1.04999h55.03027v-3.98999h-182.74023Zm68.33008,4.76001h-3.47998v-3.47998h3.47998v3.47998Zm59.09009,0h-3.47998v-3.47998h3.47998v3.47998Zm55.03979-1.04999h-54.75v-2.71002h-4.0498v2.71002h-55.05005v-2.71002h-4.04004v2.71002h-64.29004v-3.42004h182.17993v3.42004Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={160.31905}
              y={349.17343}
              width={7.81004}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={160.55359}
              y={349.40802}
              width={7.341}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M166.05005,330.31879v-.75h-8.38013l2.93018-2.94-.53003-.53003-3.44995,3.47003h-23.8501c.83008-.64001,1.37988-1.64001,1.37988-2.77002,0-1.94-1.57983-3.52002-3.52002-3.52002-1.94995,0-3.52002,1.58002-3.52002,3.52002,0,1.13,.54004,2.13,1.37012,2.77002h-14.71997v20.35999h22.59985l-4.35986,4.38,.53003,.52997,4.88989-4.90997h6.38013v-.75h-29.29004v-18.85999h51.54004Zm-35.42017-6.29004c1.52002,0,2.77002,1.23999,2.77002,2.77002s-1.25,2.77002-2.77002,2.77002c-1.52979,0-2.77002-1.23999-2.77002-2.77002s1.24023-2.77002,2.77002-2.77002Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M165.82007,330.08875v-.27997h-8.15015l-.15991-.40002,2.76001-2.77997-.19995-.20001-3.36011,3.38h-23.93994l-.1499-.41998c.81982-.64001,1.29004-1.58002,1.29004-2.59003,0-1.81-1.47021-3.28998-3.28027-3.28998-1.81982,0-3.28979,1.47998-3.28979,3.28998,0,1.01001,.46997,1.95001,1.28979,2.59003l-.1499,.41998h-14.48999v19.88h22.36987l.17017,.39996-4.19995,4.22003,.19995,.20001,4.79004-4.82001h6.25v-.28003h-29.30005v-19.32001h51.55005Zm-38.19995-3.28998c0-1.65997,1.34985-3.01001,3.00977-3.01001,1.65015,0,3,1.35004,3,3.01001,0,1.65002-1.34985,3-3,3-1.65991,0-3.00977-1.34998-3.00977-3Z"
              style={{ fill: "#3d3f42" }}
            />
            <Polygon
              points="191.28339 329.56442 182.56854 329.56442 182.56854 330.31442 190.53339 330.31442 190.53339 349.17331 183.45819 349.17331 183.45819 349.92331 191.28339 349.92331 191.28339 329.56442"
              style={{ fill: "#3d3f42" }}
            />
            <Polygon
              points="183.69273 349.68872 183.69273 349.40784 190.76791 349.40784 190.76791 330.07986 182.80307 330.07986 182.80307 329.79898 191.04884 329.79898 191.04884 349.68872 183.69273 349.68872"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M175.29004,323.27875c-1.93994,0-3.52002,1.58002-3.52002,3.52002s1.58008,3.52002,3.52002,3.52002c1.94995,0,3.52002-1.58002,3.52002-3.52002s-1.57007-3.52002-3.52002-3.52002Zm0,6.29004c-1.52002,0-2.77002-1.23999-2.77002-2.77002s1.25-2.77002,2.77002-2.77002c1.53003,0,2.77002,1.23999,2.77002,2.77002s-1.23999,2.77002-2.77002,2.77002Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M175.29004,323.50879c-1.81006,0-3.28003,1.47998-3.28003,3.28998s1.46997,3.28003,3.28003,3.28003c1.81982,0,3.29004-1.47003,3.29004-3.28003s-1.47021-3.28998-3.29004-3.28998Zm0,6.28998c-1.6499,0-3-1.34998-3-3,0-1.65997,1.3501-3.01001,3-3.01001,1.65991,0,3.01001,1.35004,3.01001,3.01001,0,1.65002-1.3501,3-3.01001,3Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M570.08008,240.06879v16.88h27.69995v-16.88h-27.69995Zm5,3.57996h.10986v-.38l.18018-.31995-3.56006-2.13h24.25l-3.57007,2.13,.38013,.64996,4.15991-2.48999v14.79999l-6.17017-3.69-.37988,.65002,5.57007,3.33002h-24.22998l5.57007-3.33002-.38013-.65002-6.17993,3.70001v-14.82001l4.25,2.54999Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M570.32007,240.29877v16.40997h27.22998v-16.40997h-27.22998Zm26.94995,15.60999l-.35986,.20001-5.96021-3.57001-.1499,.25,5.36987,3.21002-.11987,.42999h-24.22998l-.12012-.42999,5.37012-3.21002-.14014-.25-5.97998,3.58002-.34985-.20001v-14.82001l.34985-.20001,4,2.40002v-.09998l.1001-.17004-3.36011-2.01001,.12012-.43994h24.25l.11987,.43994-3.36987,2.01001,.1499,.25,3.9502-2.37,.35986,.20001v14.79999Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M676.10986,207.99872v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-17.91992,4.25c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-8.36011-7.05005v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm-32.23999-1.54004v.62012h23.10986v-.62012h-23.10986Zm22.87988,.38013h-22.6499v-.14014h22.6499v.14014Zm4.07007,4.44995l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm6.32983-5.84009v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-26.28003-1.59009v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm-.48999,3.09009c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-4.80005-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm6.32983-5.84009v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-26.28003,1.36987h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008v2.95996Zm.23999-2.71997h8.61011v2.51001h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999Zm8.12012,5.6001c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm32.09985,174.53998l-14.13989-344.26996-.02002-.36011h-6.96997v6.91003l3.34985,.25,6.24023,155.37h-2.64014v1.20996h-16.67993v-1.20996h-10.11011v1.20996h-22.6499v-.94995h-2.30005v-21.42993h-5.03003v4.09985l1.12012-.03992v21.28003h6.20996v-1.31995h22.6499v1.13989h3.91992v2.19995c-.11987-.03992-.23975-.06995-.36987-.06995-.6001,0-1.1001,.49011-1.1001,1.08997,0,.61011,.5,1.1001,1.1001,1.1001,.59985,0,1.09985-.48999,1.09985-1.1001,0-.34985-.17993-.6499-.43994-.84985h4c-.26001,.19995-.43994,.5-.43994,.84985,0,.61011,.5,1.1001,1.1001,1.1001,.60986,0,1.09985-.48999,1.09985-1.1001,0-.59985-.48999-1.08997-1.09985-1.08997-.12012,0-.24023,.03003-.36011,.06995v-2.17993h1.6001v-1.15991h16.67993v.80994l1.08984,1.08997v1.41003c-.06982-.02002-.12988-.04004-.19971-.04004-.61011,0-1.1001,.49011-1.1001,1.08997,0,.61011,.48999,1.1001,1.1001,1.1001,.59985,0,1.09985-.48999,1.09985-1.1001,0-.28003-.11987-.53003-.29004-.71997h1.19995l1.51001,37.60004h-1.53979v16.27002h2.18994l.11987,3.01996h-.90991v-2.83997h-.75v3.58997h1.68994l1.1001,27.41003,.06006,1.62,1.11987,27.79999h-7.45996v39.08002h9.03003l.72998,18.07996-18.07007-.08997,3.67017,18.39001h3.13989l-3.58008-16.15002,14.92993,.07001v1.76001h4.30005Zm-13.3999-22.81v-37.58002h6.73999l1.51001,37.58002h-8.25Zm2.84009-106.89001h1.11987l.29004,7.21002h-1.40991v-7.21002Zm0-.75v-6.81h.81982l.27002,6.81h-1.08984Zm-53.81006-50.64001v.19995h-.38013v1.64014h.38013v.56995h-4.70996v-21.30994l-1.12012,.03992v-2.56995h3.53003v21.42993h2.30005Zm23.3999,.94995v.14014h-22.6499v-.14014h22.6499Zm3.55005,4.91003c.18994,0,.34985,.15002,.34985,.33997,0,.19006-.15991,.3501-.34985,.3501s-.3501-.16003-.3501-.3501c0-.18994,.16016-.33997,.3501-.33997Zm-2.80005-3.63v-2.48999h8.61011v2.51001h-1.6001v2.3501h-3.09009v-2.37012h-3.91992Zm8.12012,4.32007c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm17.91992-5.6001v.14014h-16.67993v-.14014h16.67993Zm.89014,4.91003c.18994,0,.34985,.15002,.34985,.33997,0,.19006-.15991,.3501-.34985,.3501-.19019,0-.3501-.16003-.3501-.3501,0-.18994,.15991-.33997,.3501-.33997Zm-.14014-3.5199v-2.6001h1.91992l.2002,4.98999h-1.03027v-1.30005l-1.08984-1.08984Zm-6.94995-165.13013h5.5l14.09985,343.13007h-2.77002v-1.76001l-16.60986-.08002,3.58008,16.16003h-1.6001l-3.35986-16.89001,17.92993,.09998-13.44019-334.62-.00977-.33008-3.32007-.23999v-5.46997Zm-16.52002,168.33008l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm5.32007-1.20996c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-8.36011-7.05005v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm.51978-1.54004v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Zm-22.71997,4.44995l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm.52002-1.01001l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.01001c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm5.32007-1.20996c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.20996c-.18994,0-.3501-.16003-.3501-.3501,0-.18994,.16016-.33997,.3501-.33997s.34985,.15002,.34985,.33997c0,.19006-.15991,.3501-.34985,.3501Zm-8.36011-7.05005v2.95996h3.92017v2.38013h3.56982v-2.3501h1.59009v-2.98999h-9.08008Zm8.8501,2.75h-1.6001v2.3501h-3.09009v-2.37012h-3.91992v-2.48999h8.61011v2.51001Zm.51978-1.54004v.62012h17.14014v-.62012h-17.14014Zm16.91016,.38013h-16.67993v-.14014h16.67993v.14014Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M670.30005,212.8288l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm.52002-1.23999l.01001-.05005-.23999-.08997c-.12012-.04004-.21021-.05994-.29004-.05994-.47998,0-.86011,.38989-.86011,.85986,0,.47998,.38013,.86011,.86011,.86011s.86011-.38013,.86011-.86011c0-.25-.12012-.48999-.34009-.65991Zm-.52002,1.23999c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996s.57983,.26001,.57983,.57996c0,.32007-.25977,.58008-.57983,.58008Zm5.32007-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm24.46997,83.75l.05981,1.62h.03027v-1.62h-.09009Zm-2.79004-30.76001v.08002h.28003v-.08002h-.28003Zm-.38013-.92999v-.61005h-.27979v.89001h1.05981v-.27997h-.78003Zm-21.2998-53.49994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm24.46997,83.75l.05981,1.62h.03027v-1.62h-.09009Zm-2.79004-30.76001v.08002h.28003v-.08002h-.28003Zm-.38013-.92999v-.61005h-.27979v.89001h1.05981v-.27997h-.78003Zm-21.2998-53.49994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm24.46997,83.75l.05981,1.62h.03027v-1.62h-.09009Zm-3.17017-32.30005h-.27979v.89001h1.05981v-.27997h-.78003v-.61005Zm-21.2998-52.88989c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm31.85986,174.07996l-14.13989-344.03992v-.13013h-6.52002v6.46008l3.34009,.25,6.25977,155.81995h-2.6499v1.20996h-17.14014v-1.20996h-9.6499v1.20996h-23.10986v-.93994h-2.30005v-21.43994h-4.56006v3.62988l1.11987-.03992v21.27991h5.74023v-1.30994h23.10986v1.14001h3.91992v2.54004l.06006-.17004h4l.07007,.20007v-2.55005h1.59985v-1.16003h17.14014v.94006l1.09009,1.08997v1.78992l-.28003-.04993c-.03003-.01001-.06006-.02002-.09009-.02991-.02002,0-.05005-.01001-.05981-.01001-.48022,0-.86011,.38989-.86011,.85986,0,.47998,.37988,.86011,.86011,.86011,.46973,0,.85986-.38013,.85986-.86011,0-.26001-.12012-.44995-.22998-.55994l.17993-.40002h1.42017l1.52979,38.08002h-1.5498v15.79999h2.18994l.13989,3.48999h-1.38989v-2.83997h-.28003v3.12h1.67993l1.11011,27.64001,.05981,1.62,1.13013,28.02997h-7.47998v38.61005h9.03003l.73999,18.56-18.02002-.10004,3.57007,17.92999h2.65991l-3.58008-16.15997,15.46021,.07001v1.76996h3.81982Zm-63.88989-180.43005h-.39014v1.18005h.39014v1.03003h-5.17993v-21.28992l-1.12012,.03992v-3.05994h4v21.43994h2.30005v.65991Zm23.38989,.90015h-23.10986v-.62012h23.10986v.62012Zm9.36011,1.15991h-1.59009v2.3501h-3.56982v-2.38013h-3.92017v-2.95996h9.08008v2.98999Zm17.42993-1.15991h-17.14014v-.62012h17.14014v.62012Zm.66016,5.44995c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm.70996-1.82007v-1.43994l-1.09009-1.09009v-2.92993h2.38013l.21973,5.45996h-1.50977Zm1.77979,38.64008h1.28003l.29004,7.27997h-1.57007v-7.27997Zm0,15.23999v-7.67999h1.59009l.30005,7.67999h-1.89014Zm-2.82983,99.66998v-38.03998h7.19995l1.53003,38.03998h-8.72998Zm-6.23999,20.22998l3.58008,16.16003h-2.08008l-3.45996-17.35999,17.96997,.08997-13.42017-334.5-3.33984-.23999v-5.92004h5.96997l14.11987,343.61004h-3.25v-1.77002l-16.08984-.07001Zm-12.22998-173.3999c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm21.2998,52.06v-.61005h-.27979v.89001h1.05981v-.27997h-.78003Zm.38013,.92999v.08002h.28003v-.08002h-.28003Zm2.79004,30.76001l.05981,1.62h.03027v-1.62h-.09009Zm-24.46997-85.18994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm0-1.43994c-.1001,0-.18994,.02991-.28003,.05994l-.25,.08997,.01001,.05005c-.22021,.16992-.34009,.40991-.34009,.65991,0,.47998,.38989,.86011,.86011,.86011,.47998,0,.85986-.38013,.85986-.86011,0-.46997-.37988-.85986-.85986-.85986Zm0,1.43994c-.32007,0-.58008-.26001-.58008-.58008,0-.31995,.26001-.57996,.58008-.57996,.31982,0,.57983,.26001,.57983,.57996,0,.32007-.26001,.58008-.57983,.58008Zm21.2998,52.06v-.61005h-.27979v.89001h1.05981v-.27997h-.78003Zm3.17017,31.69l.05981,1.62h.03027v-1.62h-.09009Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M586.37988,134.30878v41.13h1.25v-41.13h-1.25Zm.97021,40.84998h-.68994v-40.55994h.68994v40.55994Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={246.35805}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={246.59254}
              y={210.77112}
              width={3.23996}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={256.26086}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={256.49539}
              y={210.77112}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={265.96985}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={266.20435}
              y={210.77112}
              width={3.24094}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={275.87387}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={276.10843}
              y={210.77112}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={285.6478}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={285.88232}
              y={210.77112}
              width={3.23996}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={295.5499}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={295.78442}
              y={210.77112}
              width={3.24088}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={305.26083}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={305.49533}
              y={210.77112}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={315.16388}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={315.39844}
              y={210.77112}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={324.42194}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={324.65643}
              y={210.77112}
              width={3.24094}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={334.32477}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={334.5593}
              y={210.77112}
              width={3.23993}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={344.03372}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={344.26825}
              y={210.77112}
              width={3.24088}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={353.93777}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={354.17227}
              y={210.77112}
              width={3.24094}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M568.6001,317.28876v1.94h10.61987v-1.94h-10.61987Zm.75,1.19v-.44h9.11987v.44h-9.11987Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M568.84009,317.52875v1.47003h10.13989v-1.47003h-10.13989Zm9.85986,1.19h-9.57983v-.90997h9.57983v.90997Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={363.19583}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={363.43033}
              y={210.77112}
              width={3.23996}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={373.09866}
              y={210.53659}
              width={3.71021}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={373.33319}
              y={210.77112}
              width={3.24112}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={382.80859}
              y={210.53659}
              width={3.70923}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={383.04321}
              y={210.77112}
              width={3.24005}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={392.71289}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={392.94748}
              y={210.77112}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={401.9697}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={402.20428}
              y={210.77112}
              width={3.24084}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={411.87375}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={412.10828}
              y={210.77112}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={421.58273}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={421.81735}
              y={210.77112}
              width={3.24078}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={431.48581}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={431.7204}
              y={210.77112}
              width={3.24078}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={440.74457}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={440.97913}
              y={210.77112}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={450.64764}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={450.88217}
              y={210.77112}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={460.3576}
              y={210.53659}
              width={3.70923}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={460.59219}
              y={210.77112}
              width={3.24005}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={470.26068}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={470.49524}
              y={210.77112}
              width={3.23981}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={480.29263}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={480.52719}
              y={210.77112}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={490.19571}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={490.4303}
              y={210.77112}
              width={3.23981}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={499.90469}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={500.13928}
              y={210.77112}
              width={3.24078}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={509.80774}
              y={210.53659}
              width={3.70996}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={510.04233}
              y={210.77112}
              width={3.24088}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={519.77673}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={520.01129}
              y={210.77112}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={529.67957}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={529.91412}
              y={210.77112}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={539.38953}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={539.62402}
              y={210.77112}
              width={3.23987}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={549.2926}
              y={210.53659}
              width={3.70898}
              height={0.75}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={549.52716}
              y={210.77112}
              width={3.23981}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M600.05841,207.27158c0-.39893-.32324-.72192-.72217-.72192-.39795,0-.72192,.323-.72192,.72192s.32397,.72192,.72192,.72192c.39893,0,.72217-.323,.72217-.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M599.33624,207.75894c-.26874,0-.48737-.21864-.48737-.4874s.21863-.4873,.48737-.4873c.26892,0,.48761,.21857,.48761,.4873s-.21875,.4874-.48761,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M614.92096,190.92906c.39893,0,.72192-.323,.72192-.72192,0-.39905-.323-.72205-.72192-.72205-.39819,0-.72192,.323-.72192,.72205,0,.39893,.32373,.72192,.72192,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M614.92096,190.6945c-.26874,0-.48737-.21864-.48737-.4874,0-.26881,.21863-.48747,.48737-.48747s.4873,.21864,.4873,.48747c0,.26874-.21857,.4874-.4873,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M617.87238,190.92906c.39917,0,.72217-.323,.72217-.72192,0-.39905-.323-.72205-.72217-.72205-.39795,0-.72192,.323-.72192,.72205,0,.39893,.32397,.72192,.72192,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M617.87238,190.6945c-.26874,0-.48737-.21864-.48737-.4874,0-.26881,.21863-.48747,.48737-.48747,.2688,0,.48755,.21864,.48755,.48747,0,.26874-.21875,.4874-.48755,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M636.72534,212.32114c.39893,0,.72192-.323,.72192-.72192,0-.39905-.323-.72205-.72192-.72205-.39795,0-.72217,.323-.72217,.72205,0,.39893,.32422,.72192,.72217,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M636.72534,212.08656c-.26892,0-.48761-.21864-.48761-.4874,0-.26881,.21875-.48747,.48761-.48747,.26874,0,.48737,.21864,.48737,.48747,0,.26874-.21863,.4874-.48737,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M601.2276,239.21515c0,.39893,.32397,.72192,.72192,.72192,.39893,0,.72217-.323,.72217-.72192s-.32324-.72192-.72217-.72192c-.39795,0-.72192,.323-.72192,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M601.94952,239.70248c-.26874,0-.4873-.21857-.4873-.4873s.21857-.4874,.4873-.4874c.26892,0,.48761,.21864,.48761,.4874s-.21875,.4873-.48761,.4873Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M641.69312,185.01378c.39893,0,.72192-.323,.72192-.72192,0-.39905-.323-.72205-.72192-.72205-.39795,0-.72217,.323-.72217,.72205,0,.39893,.32422,.72192,.72217,.72192Z"
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M641.69318,184.77922c-.26892,0-.48761-.21864-.48761-.4874,0-.26881,.21875-.48747,.48761-.48747,.26874,0,.4873,.21864,.4873,.48747,0,.26874-.21857,.4874-.4873,.4874Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={621.1106}
              y={188.59225}
              width={0.28088}
              height={0.28085}
              style={{ fill: "#3d3f42" }}
            />
            <Path
              d="M514.1001,15.08881v2h9.95996v-2h-9.95996Zm9.67993,1.71997h-9.40015v-1.43994h9.40015v1.43994Z"
              style={{ fill: "#3d3f42" }}
            />
          </G>
          <Rect
            x={132.99812}
            y={386.67053}
            width={11.07326}
            height={10.10324}
            style={{ fill: "#28cae5" }}
          />
          <Rect
            x={151.56335}
            y={386.67053}
            width={11.07324}
            height={10.10324}
            style={{ fill: "#28cae5" }}
          />
          <Rect
            x={108.22998}
            y={13.89868}
            width={0.28003}
            height={274.42331}
            style={{ fill: "#3d3f42" }}
          />
          <Rect
            x={144.07137}
            y={398.77536}
            width={0.2785}
            height={0.27856}
            style={{ fill: "#15ff7e" }}
          />
          <Rect
            x={133.77638}
            y={155.16878}
            width={0.27765}
            height={6.27837}
            style={{ fill: "#3d3f42" }}
          />
          <G>
            <G>
              <Path
                d="M139.875,393.91406c-.19385,0-.35156-.15723-.35156-.35156v-3.3252c0-.19434,.15771-.35156,.35156-.35156s.35156,.15723,.35156,.35156v3.3252c0,.19434-.15771,.35156-.35156,.35156Z"
                style={{ fill: "#fff" }}
              />
              <Polygon
                points="138.68335 391.63754 139.875 390.4454 141.06641 391.63754 141.06641 390.62589 139.875 389.43442 138.68335 390.62589 138.68335 391.63754"
                style={{ fill: "#fff" }}
              />
            </G>
            <G>
              <Path
                d="M137.19434,393.55859c-.19385,0-.35156-.15723-.35156-.35156v-3.3252c0-.19434,.15771-.35156,.35156-.35156s.35156,.15723,.35156,.35156v3.3252c0,.19434-.15771,.35156-.35156,.35156Z"
                style={{ fill: "#fff" }}
              />
              <Polygon
                points="138.38599 391.80679 137.19458 392.99893 136.00317 391.80679 136.00317 392.81845 137.19458 394.00992 138.38599 392.81845 138.38599 391.80679"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <G>
              <Path
                d="M158.44043,393.91406c-.19385,0-.35156-.15723-.35156-.35156v-3.3252c0-.19434,.15771-.35156,.35156-.35156s.35156,.15723,.35156,.35156v3.3252c0,.19434-.15771,.35156-.35156,.35156Z"
                style={{ fill: "#fff" }}
              />
              <Polygon
                points="157.24858 391.63754 158.44023 390.4454 159.63164 391.63754 159.63164 390.62589 158.44023 389.43442 157.24858 390.62589 157.24858 391.63754"
                style={{ fill: "#fff" }}
              />
            </G>
            <G>
              <Path
                d="M155.75977,393.55859c-.19385,0-.35156-.15723-.35156-.35156v-3.3252c0-.19434,.15771-.35156,.35156-.35156s.35156,.15723,.35156,.35156v3.3252c0,.19434-.15771,.35156-.35156,.35156Z"
                style={{ fill: "#fff" }}
              />
              <Polygon
                points="156.95122 391.80679 155.75981 392.99893 154.56841 391.80679 154.56841 392.81845 155.75981 394.00992 156.95122 392.81845 156.95122 391.80679"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <G>
              <Path
                d="M201.53027,396.35059h-10.86182v-15.99121h10.86182v15.99121Zm-10.61182-.25h10.36182v-15.49121h-10.36182v15.49121Z"
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={190.79346}
                y={382.32715}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={190.79346}
                y={384.29492}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={190.79346}
                y={386.26172}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={190.79346}
                y={388.22949}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={190.79346}
                y={390.19727}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={190.79346}
                y={392.16504}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={190.79346}
                y={394.13281}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
            </G>
            <G>
              <Path
                d="M212.14209,402.25293h-10.86182v-15.99121h10.86182v15.99121Zm-10.61182-.25h10.36182v-15.49121h-10.36182v15.49121Z"
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={201.40527}
                y={388.22949}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={201.40527}
                y={390.19727}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={201.40527}
                y={392.16504}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={201.40527}
                y={394.13281}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={201.40527}
                y={396.10059}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={201.40527}
                y={398.06836}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={201.40527}
                y={400.03613}
                width={10.61182}
                height={0.25}
                style={{ fill: "#3d3f42" }}
              />
            </G>
          </G>
          <Polygon
            points="158.18951 62.90195 157.8999 62.90195 157.91016 55.44004 158.18994 55.44004 158.18951 62.90195"
            style={{ fill: "#3d3f42" }}
          />
          <G>
            <G>
              <Path
                d="M143.70654,26.23096h-11.75v-8.00293h11.75v8.00293Zm-11.5-.25h11.25v-7.50293h-11.25v7.50293Z"
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={142.01904}
                y={18.35303}
                width={0.25}
                height={7.75293}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={140.58154}
                y={18.35303}
                width={0.25}
                height={7.75293}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={139.14404}
                y={18.35303}
                width={0.25}
                height={7.75293}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={137.70654}
                y={18.35303}
                width={0.25}
                height={7.75293}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={136.26904}
                y={18.35303}
                width={0.25}
                height={7.75293}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={134.83154}
                y={18.35303}
                width={0.25}
                height={7.75293}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={133.39404}
                y={18.35303}
                width={0.25}
                height={7.75293}
                style={{ fill: "#3d3f42" }}
              />
            </G>
            <G>
              <Path
                d="M139.39404,33.9834h-11.75v-8.00244h11.75v8.00244Zm-11.5-.25h11.25v-7.50244h-11.25v7.50244Z"
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={137.70654}
                y={26.10596}
                width={0.25}
                height={7.75244}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={136.26904}
                y={26.10596}
                width={0.25}
                height={7.75244}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={134.83154}
                y={26.10596}
                width={0.25}
                height={7.75244}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={133.39404}
                y={26.10596}
                width={0.25}
                height={7.75244}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={131.95654}
                y={26.10596}
                width={0.25}
                height={7.75244}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={130.51904}
                y={26.10596}
                width={0.25}
                height={7.75244}
                style={{ fill: "#3d3f42" }}
              />
              <Rect
                x={129.08154}
                y={26.10596}
                width={0.25}
                height={7.75244}
                style={{ fill: "#3d3f42" }}
              />
            </G>
          </G>
          <Polygon
            points="185.64111 56.61719 159.91992 56.61719 159.91992 56.36719 185.39111 56.36719 185.39111 39.04199 127.25977 39.04199 127.25977 38.79199 185.64111 38.79199 185.64111 56.61719"
            style={
              path === "swHallLobbyElevator1-mechanicalRoom1" ||
              path === "mechanicalRoom1-swHallLobbyElevator1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Path
            d="M563.08594,419.88477h-.125c-2.91406,0-5.35352-2.07227-5.92188-4.82031-.56836,2.74805-3.00781,4.82031-5.92188,4.82031h-.125v-10.09375h.25v9.84277c3.13867-.06738,5.67188-2.6416,5.67188-5.7959v-2.04492h.25v2.04492c0,3.1543,2.5332,5.72852,5.67188,5.7959v-7.84082h.25v8.0918Z"
            style={{ fill: "#3d3f42" }}
          />
          <G>
            <Path
              d="M572.17969,411.28223h-9.64941v-.30078h9.34863c-.0332-1.47949-.625-2.86719-1.67676-3.9209-1.0918-1.0957-2.54492-1.69824-4.0918-1.69824h-1.75v-.30078h1.75c1.62695,0,3.15625,.63477,4.30469,1.78711,1.14355,1.14648,1.77051,2.66797,1.76562,4.2832l-.00098,.15039Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={563.79004}
              y={405.06152}
              width={2.32031}
              height={0.30078}
              style={{ fill: "#3d3f42" }}
            />
          </G>
          <G>
            <Path
              d="M569.40039,402.3418h-.30078v-8.49902l.15039-.00098h.01855c1.6084,0,3.12305,.62695,4.26465,1.76562,1.15234,1.14844,1.78711,2.67773,1.78711,4.30469v1.75h-.30078v-1.75c0-1.54688-.60254-3-1.69824-4.0918-1.05371-1.05176-2.44141-1.64355-3.9209-1.67676v8.19824Z"
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={575.01953}
              y={399.91211}
              width={0.30078}
              height={2.32031}
              style={{ fill: "#3d3f42" }}
            />
          </G>
          <G>
            <Path
              d="M239.4297,424.66196v-7.17993h10.64059v7.17993h-10.64059Zm7.19431-4.2092c.00748,.0137,.0125,.02039,.01503,.02795,.09428,.28113,.18922,.56204,.2809,.84406,.0081,.02493,.00148,.05988-.0097,.08514-.36053,.81415-.72249,1.62766-1.08414,2.44128-.04063,.09143-.08067,.18314-.12096,.27463,.0112,.005,.01495,.00818,.01872,.00818,.23953,.00052,.4791,.00171,.71861-.00079,.01849-.00018,.04469-.02286,.05376-.0416,.04955-.1026,.09465-.20734,.14162-.31119,.22166-.4902,.44333-.98041,.66522-1.47052,.06812-.15045,.13693-.30057,.20876-.4581,.00983,.01843,.01648,.02872,.02106,.03986,.15144,.3681,.3037,.73587,.4527,1.10495,.01909,.04727,.0405,.06491,.09296,.06461,.41666-.00241,.83331-.00134,1.24998-.00134h.06876v-.62369h-.08276c-.25906,0-.51813-.00119-.77718,.0011-.04543,.0004-.0618-.01263-.07272-.05746-.06566-.26962-.13351-.53876-.20444-.80704-.0527-.1994-.09892-.40182-.17035-.59464-.07602-.20523-.17851-.40067-.269-.60056-.03569-.07883-.07018-.1582-.10786-.24335,.19743,0,.38306-.0011,.56862,.00174,.0182,.00027,.04451,.02084,.0527,.0386,.05952,.12897,.11516,.25974,.17241,.38977,.03954,.08981,.0797,.17935,.12057,.27127,.14642-.06363,.28574-.12418,.4232-.1839-.00087-.01056-.00014-.0152-.00171-.01883-.13342-.31039-.26759-.62045-.39992-.9313-.01569-.03687-.04187-.03571-.07249-.03568-.68204,.00024-1.36407,.00055-2.04611-.00073-.04182-.00009-.06566,.0134-.08859,.04822-.18146,.27542-.36583,.54892-.54733,.82431-.02534,.03845-.05244,.05649-.09946,.05453-.08406-.00345-.16835-.00095-.25255-.00095h-.29929v.46786h.07808c.19431,0,.3886,.00049,.5829-.00021,.08823-.00031,.18996,.02374,.26086-.01212,.07098-.03589,.11153-.13242,.16478-.20288,.09717-.12857,.19386-.25748,.29436-.39105v-.00015Zm-5.52953-.43857c.05801-.40796,.11362-.79895,.16995-1.19513-.01408,.00461-.02087,.00516-.0255,.00861-.18481,.13806-.36987,.27576-.55328,.41565-.01625,.01239-.02795,.03818-.03104,.0593-.0565,.38785-.11156,.77594-.1665,1.16403-.01802,.12726-.03494,.2547-.05292,.38617,.07524,.01111,.14513,.02176,.2151,.03174,.43739,.06241,.87494,.12378,1.31201,.18832,.04503,.00665,.07854-.00116,.11307-.02762,.0872-.0668,.17598-.13156,.26381-.19757,.09401-.07062,.18765-.14175,.29434-.22238-.40446-.05777-.79234-.11316-1.19873-.17117,.45795-.34387,.89984-.67566,1.34477-1.00974-.11469-.15222-.22417-.29749-.3351-.44473-.44928,.33765-.89165,.6701-1.34999,1.01456v-.00003Zm.64734,2.46985h1.10512v-.97308h1.02397v-.91498h.83855v-.27298h-1.1179v.91318h-1.02341v.97321h-1.10774v.96753h-1.07912v1.05917h.27383v-.78558h1.08669v-.96652l.00002,.00006Zm5.49644-3.51254c.00157-.30026-.2411-.54727-.53893-.54855-.2975-.00128-.54469,.24506-.54477,.54282-.00006,.29761,.24062,.54184,.53531,.54318,.30176,.0014,.54681-.2388,.54839-.53748v.00003Z"
              style={{ fill: "#007f02" }}
            />
            <Path
              d="M246.62399,420.44965c-.10049,.13358-.19719,.26248-.29436,.39105-.05324,.07043-.0938,.16699-.16478,.20288-.07091,.03586-.17264,.01178-.26086,.01212-.19431,.0007-.3886,.00021-.5829,.00021h-.07808v-.46786h.29929c.0842,0,.1685-.0025,.25255,.00095,.04701,.00192,.07413-.01611,.09946-.05453,.1815-.27539,.36588-.54889,.54733-.82431,.02293-.03482,.04677-.04828,.08859-.04822,.68204,.00128,1.36407,.00098,2.04611,.00073,.03062,0,.05679-.00119,.07249,.03568,.13232,.31085,.26648,.62091,.39992,.9313,.00157,.00363,.00084,.00827,.00171,.01883-.13748,.05975-.27679,.12027-.4232,.1839-.04088-.09192-.08102-.18146-.12057-.27127-.05725-.13004-.1129-.2608-.17241-.38977-.00819-.01776-.0345-.03833-.0527-.0386-.18556-.00284-.37119-.00174-.56862-.00174,.03769,.08514,.07217,.16452,.10786,.24335,.09048,.19992,.19299,.39532,.269,.60056,.07143,.19281,.11765,.39523,.17035,.59464,.07091,.26831,.13876,.53745,.20444,.80704,.01093,.04483,.0273,.05789,.07272,.05746,.25903-.00229,.51811-.0011,.77718-.0011h.08276v.62369h-.06876c-.41667,0-.83334-.00107-1.24998,.00134-.05247,.00031-.07387-.01733-.09296-.06461-.149-.36908-.30125-.73685-.4527-1.10495-.00458-.01114-.01125-.02142-.02106-.03986-.07179,.15753-.14062,.30765-.20876,.4581-.22189,.49011-.44356,.98032-.66522,1.47052-.04697,.10385-.09209,.20859-.14162,.31119-.00906,.01877-.03525,.04141-.05376,.0416-.23952,.00253-.47906,.00131-.71861,.00079-.00377,0-.00752-.00317-.01872-.00818,.04028-.09149,.08031-.1832,.12096-.27463,.36163-.81363,.72362-1.62714,1.08414-2.44128,.01118-.02524,.01781-.06018,.0097-.08514-.09167-.28198-.18661-.5629-.2809-.84406-.00253-.00754-.00755-.01425-.01503-.02795v.00015Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M241.09448,420.01108c.45833-.34445,.90071-.67691,1.34999-1.01456,.11095,.14725,.22041,.29254,.3351,.44473-.44495,.33408-.88683,.66589-1.34479,1.00974,.40639,.05804,.79427,.11343,1.19873,.17117-.10667,.08063-.20033,.15173-.29434,.22238-.08783,.06598-.17661,.13077-.26381,.19757-.03455,.02646-.06802,.03427-.11305,.02762-.43707-.06454-.87462-.12592-1.31201-.18832-.06998-.00998-.13986-.02063-.2151-.03174,.01797-.13147,.0349-.25888,.05292-.38617,.05496-.38809,.11-.77618,.1665-1.16403,.00308-.02112,.01479-.04691,.03104-.0593,.18343-.13989,.36848-.27762,.55328-.41565,.00461-.00345,.0114-.00397,.0255-.00861-.05634,.39621-.11194,.7872-.16995,1.19513v.00003Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M241.74182,422.48093v.96652h-1.08669v.78558h-.27383v-1.05917h1.07912v-.96753h1.10774v-.97321h1.02341v-.91318h1.1179v.27298h-.83855v.91498h-1.02397v.97308h-1.10512l-.00002-.00006Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M247.23827,418.96838c-.00156,.29868-.24661,.53885-.54839,.53748-.29469-.00134-.53537-.24557-.53531-.54318,.00006-.29779,.24727-.5441,.54477-.54282,.29782,.00128,.5405,.24829,.53893,.54855v-.00003Z"
              style={{ fill: "#fff" }}
            />
          </G>
          <G>
            <Rect
              x={563.69965}
              y={226.7869}
              width={0.75}
              height={3.70898}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={563.69965}
              y={233.59338}
              width={0.75}
              height={3.70898}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={563.69965}
              y={219.98041}
              width={0.75}
              height={3.70898}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={563.69965}
              y={213.17392}
              width={0.75}
              height={3.70898}
              style={{ fill: "#3d3f42" }}
            />
          </G>
          <G>
            <Rect
              x={563.69965}
              y={198.57745}
              width={0.75}
              height={3.45445}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={563.69965}
              y={204.91685}
              width={0.75}
              height={3.45445}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={563.69965}
              y={192.23808}
              width={0.75}
              height={3.45445}
              style={{ fill: "#3d3f42" }}
            />
            <Rect
              x={563.69965}
              y={185.8987}
              width={0.75}
              height={3.45445}
              style={{ fill: "#3d3f42" }}
            />
          </G>
          <Path
            d="M87.66553,329.73047h-9.50049l.03223-8.41309c-3.5835,.09375-6.47803,3.05078-6.47803,6.65039v1.7627H35.23389v-.25h36.23535v-1.5127c0-3.77832,3.07422-6.875,6.85254-6.90234l.12646-.00098-.03223,8.41602h9.24951v.25Z"
            style={{ fill: "#3d3f42" }}
          />
        </G>
        <G id="Paths">
          <Polyline
            points="194.80646 431.16187 194.80646 409.18475 213.70161 409.16168 213.70161 358.41766 199.06451 358.41766 199.0645 160.40038 224.68549 160.40038"
            style={
              path === "mainEnterance1-enteranceHallB1" ||
              path === "enteranceHallB1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="188.9677 430.9657 188.96774 372.83908 97.43132 372.83905 97.43132 354.74197"
            style={
              path === "mainEnterance1-theaterStorageSw1" ||
              path === "theaterStorageSw1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="187.9669 430.9657 187.96693 373.86319 101.67742 373.86316 101.67742 403.77383"
            style={
              path === "mainEnterance1-mechanicalRoomSw1" ||
              path === "mechanicalRoomSw1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="187.01613 430.9657 187.0161 371.87134 110.6307 371.87131 110.6307 314.41653 126.96774 314.41653 126.96774 306.90359"
            style={
              path === "mainEnterance1-theaterStorage1" ||
              path === "theaterStorage1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="185.09679 430.9657 185.09676 377.99289 148.17339 377.99289 148.1734 382.61841"
            style={
              path === "mainEnterance1-elevator1" ||
              path === "elevator1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="214.96774 430.9657 214.96774 278.96893 237.10548 278.96893"
            style={
              path === "mainEnterance1-enteranceHallA1" ||
              path === "enteranceHallA1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="186.01025 430.9657 186.01022 370.51651 117.6129 370.3678 117.6129 351.452"
            style={
              path === "mainEnterance1-electricalStairs1" ||
              path === "electricalStairs1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="216.06451 430.9657 216.06451 357.16168 200.54839 357.16168 200.5484 279.98511 201.65323 279.98511 201.6532 167.19023 203.48849 167.19025 203.48853 83.91196 185.03226 83.91196 185.03226 64.39881"
            style={
              path === "mainEnterance1-restRoomLeft1" ||
              path === "restRoomLeft1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="237.10548 276.58182 197.95734 276.58182 197.95731 358.41766 118.90323 358.41766 118.90323 351.452"
            style={
              path === "electricalStairs1-enteranceHallA1" ||
              path === "enteranceHallA1-electricalStairs1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="224.34679 162.01651 196.7961 162.01651 196.79605 357.25845 120.24194 357.25839 120.24194 351.452"
            style={
              path === "electricalStairs1-enteranceHallB1" ||
              path === "enteranceHallB1-electricalStairs1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="217.12903 430.85971 217.12903 163.9389 198.03226 163.9389 198.0323 88.71006 181 88.71006 181 64.39881"
            style={
              path === "mainEnterance1-restRoomLeft1" ||
              path === "restRoomLeft1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="218.3548 430.85971 218.3548 159.01651 205.1613 159.01651 205.16129 82.62364 186.48387 82.62364 186.55646 43.45466 127.25 43.45466"
            style={
              path === "mainEnterance1-mechanicalRoom1" ||
              path === "mechanicalRoom1-mainEnterance1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="226.3773 247.76157 221.7097 247.76157 221.70969 156.35635 207.9194 156.35635 207.91936 80.62942 189.14516 80.62942 189.14516 40.4314 127.26001 40.4314"
            style={
              path === "enteranceHallA1-mechanicalRoom1" ||
              path === "mechanicalRoom1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="99.12032 403.72919 99.12032 368.14447 194.47346 368.14447 194.61362 275.54193 237.10548 275.54193"
            style={
              path === "enteranceHallA1-mechanicalRoomSw1" ||
              path === "mechanicalRoomSw1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="244.57906 284.022 244.57906 405.34201 259.54758 405.34201 259.54758 416.11835"
            style={
              path === "enteranceHallA1-publicStairsDownBottom1" ||
              path === "publicStairsDownBottom1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="246.17583 284.022 246.17583 403.87943 310.18356 403.87943 310.18356 416.11835"
            style={
              path === "enteranceHallA1-publicStairsDownBottom1" ||
              path === "publicStairsDownBottom1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="247.6113 284.022 247.6113 402.32297 311.64517 402.32297 311.64517 406.53601 553.96771 406.53598 553.96771 412.29565"
            style={
              path === "enteranceHallA1-electricalRoomBottom1" ||
              path === "electricalRoomBottom1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="248.87903 284.022 248.87903 400.86816 313.25806 400.86816 313.25806 405.09717 561.12903 405.09717 561.12903 376.96811 593.25806 376.96811 593.25806 407.03265 591.32007 407.03265"
            style={
              path === "enteranceHallA1-publicStairsDownRight1" ||
              path === "publicStairsDownRight1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="250.52419 284.022 250.52419 399.23914 314.90323 399.23914 314.90323 403.46811 559.38708 403.46811 559.38708 409.2262 570.48389 409.2262 570.48389 398.74466"
            style={
              path === "enteranceHallA1-storage1" ||
              path === "storage1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="252.06332 284.022 252.80653 397.052 317.25012 396.953 317.25012 401.18198 557.70966 401.18198 557.70966 378.9993 577.64514 378.9993 577.64514 372.09717"
            style={
              path === "enteranceHallA1-restRoomRight1" ||
              path === "restRoomRight1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="97.83871 340.06317 97.83871 319.57755 192.96774 319.57755 192.96774 248.8373 226.54018 248.83727"
            style={
              path === "enteranceHallA1-theaterStorageSw1" ||
              path === "theaterStorageSw1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="96.31452 340.06317 96.31452 318.0748 191.44354 318.0748 191.44354 167.0619 226.45874 167.0619"
            style={
              path === "enteranceHallB1-theaterStorageSw1" ||
              path === "theaterStorageSw1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="237.10548 277.77081 200.27608 277.77081 200.27608 87.05757 182.45505 87.05757 182.45505 64.39881"
            style={
              path === "enteranceHallA1-restRoomLeft1" ||
              path === "restRoomLeft1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="248.87903 268.802 248.87903 228.46419 555.51611 228.4642 555.51611 263.48425 577.06451 263.48425"
            style={
              path === "enteranceHallA1-restRoomRight1" ||
              path === "restRoomRight1-enteranceHallA1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="224.68549 165.54877 202.08871 165.54877 202.08871 85.15361 183.87097 85.15361 183.87097 64.39881"
            style={
              path === "enteranceHallB1-restRoomLeft1" ||
              path === "restRoomLeft1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="127.25 41.91974 187.64516 41.91974 187.64516 81.50191 206.8548 81.50191 206.85484 157.6133 220.3564 157.61258 220.3564 172.75513 229.12903 172.75513"
            style={
              path === "enteranceHallB1-mechanicalRoom1" ||
              path === "mechanicalRoom1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="243.94478 158.32561 243.94478 24.73295 496.74127 24.73295 496.74127 20.68198"
            style={
              path === "enteranceHallB1-loading/UnloadingDoors1" ||
              path === "loading/UnloadingDoors1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="246.59254 158.30795 246.59254 27.50438 526.16132 27.50438"
            style={
              path === "enteranceHallB1-mainLoadingDock1" ||
              path === "mainLoadingDock1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="249.45161 158.30795 249.45161 31.44467 519.07996 31.44467 519.07996 55.27658 540.30505 55.27658 540.30505 50.0649"
            style={
              path === "enteranceHallB1-electricalRoomTop1" ||
              path === "electricalRoomTop1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Line
            x1={251.12903}
            y1={168.22491}
            x2={556.125}
            y2={168.22491}
            style={
              path === "enteranceHallB1-restRoomRight1" ||
              path === "restRoomRight1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="251.12903 165.54877 549.77417 165.54877 549.77417 122.58103 576.94995 122.58103"
            style={
              path === "enteranceHallB1-restRoomRight1" ||
              path === "restRoomRight1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Line
            x1={241.55994}
            y1={173.43587}
            x2={241.55994}
            y2={183.53207}
            style={
              path === "enteranceHallB1-electricalRoomRight1" ||
              path === "electricalRoomRight1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="593.10565 74.77458 593.10565 197.41682 408.6759 197.41682"
            style={
              path === "enteranceHallB1-exitStairs1" ||
              path === "exitStairs1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="591.97803 74.77458 591.97803 119.87135 549.96771 119.87135"
            style={
              path === "enteranceHallB1-exitStairs1" ||
              path === "exitStairs1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="627.27008 193.51169 627.27008 259.74307 605.59613 259.74307 605.59613 353.74231 612.22345 353.74231"
            style={
              path === "mainLoadingDock1-equipmentRoom1" ||
              path === "equipmentRoom1-mainLoadingDock1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="628.47235 193.51169 628.47235 279.98877 679.47852 279.98877"
            style={
              path === "mainLoadingDock1-security/Receiving1" ||
              path === "security/Receiving1-mainLoadingDock1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="629.64514 193.51169 629.64514 342.11957 648.29034 342.11957 648.29034 396.83908 608.80646 396.83908 608.80646 410.19418"
            style={
              path === "mainLoadingDock1-storageRoom1" ||
              path === "storageRoom1-mainLoadingDock1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="626.08997 193.51169 626.09003 345.08414 602.87097 345.08414 602.87097 378.65161 601.58063 378.65161 601.58063 413.43198"
            style={
              path === "mainLoadingDock1-telephoneRoom1" ||
              path === "telephoneRoom1-mainLoadingDock1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="324.70969 35.40361 241.87097 35.40361 241.87097 27.66167 220.70969 27.66167"
            style={
              path === "enteranceHallB1-nwEmergency1" ||
              path === "nwEmergency1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Polyline
            points="251.12903 161.5313 546.19995 161.5313 546.19995 54.42197"
            style={
              path === "enteranceHallB1-electricalRoomTop1" ||
              path === "electricalRoomTop1-enteranceHallB1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
          <Line
            x1={655.03052}
            y1={40.07608}
            x2={698.08063}
            y2={40.07608}
            style={
              path === "mainLoadingDock1-exitRight2" ||
              path === "exitRight2-mainLoadingDock1"
                ? {
                    fill: "none",
                    stroke: "black",
                    strokeMiterlimit: 10,
                    strokeWidth: ".25px",
                  }
                : {}
            }
          />
        </G>
        <G>
          <G>
            <Path
              d="M126.47701,55.73482c0-.931,.75699-1.689,1.689-1.689,.931,0,1.689,.758,1.689,1.689s-.758,1.68903-1.689,1.68903c-.93201,0-1.689-.758-1.689-1.68903m-2.59702,0c0,2.367,1.91901,4.28601,4.28601,4.28601s4.28601-1.91901,4.28601-4.28601-1.91901-4.28598-4.28601-4.28598-4.28601,1.91901-4.28601,4.28598"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(124.66113 61.41943)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".78269px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Mechanical Room"}
              </TSpan>
            </Text>
          </G>
          <G>
            <G>
              <Path
                d="M149.78613,59.0835c-.19385,0-.35156-.15771-.35156-.35156v-3.32471c0-.19385,.15771-.35156,.35156-.35156s.35156,.15771,.35156,.35156v3.32471c0,.19385-.15771,.35156-.35156,.35156Z"
                style={{ fill: "#fff" }}
              />
              <Polygon
                points="148.59447 56.80733 149.78593 55.61516 150.97742 56.80733 150.97742 55.79564 149.78593 54.60419 148.59447 55.79564 148.59447 56.80733"
                style={{ fill: "#fff" }}
              />
            </G>
            <G>
              <Path
                d="M147.10547,58.72803c-.19385,0-.35156-.15771-.35156-.35156v-3.32471c0-.19385,.15771-.35156,.35156-.35156s.35156,.15771,.35156,.35156v3.32471c0,.19385-.15771,.35156-.35156,.35156Z"
                style={{ fill: "#fff" }}
              />
              <Polygon
                points="148.29704 56.97655 147.10558 58.1687 145.91412 56.97655 145.91412 57.98822 147.10558 59.17969 148.29704 57.98822 148.29704 56.97655"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <G>
              <Path
                d="M186.22498,107.73471c-2.367,0-4.286,1.919-4.286,4.286s1.91901,4.286,4.286,4.286,4.286-1.919,4.286-4.286-1.91901-4.286-4.286-4.286"
                style={{ fill: "#5767af" }}
              />
              <Text
                transform="translate(182.99805 117.92725)"
                style={{
                  fill: "#1b4459",
                  fontFamily: "Poppins-Regular, Poppins",
                  fontSize: "1.07239px",
                }}
              >
                <TSpan x={0} y={0}>
                  {"Public Stairs"}
                </TSpan>
              </Text>
            </G>
            <G>
              <Path
                d="M184.95413,110.8585c-.11314,.02438-.22102,.04716-.32852,.07162-.00974,.00222-.0208,.01376-.02486,.02361-.06303,.153-.12538,.30628-.18706,.45983-.03168,.07885-.10359,.12647-.18619,.12109-.08199-.00534-.1516-.06002-.16663-.14124-.00671-.03625-.00456-.07901,.00839-.1132,.07092-.18731,.14674-.37278,.22028-.55911,.02699-.06841,.07465-.11016,.14726-.126,.24294-.05299,.48611-.10511,.72807-.16225,.09079-.02144,.17732-.0215,.26495,.00883,.03011,.01042,.06136,.01764,.09225,.02566,.09566,.02484,.16843,.0804,.21957,.16428,.09328,.15293,.18633,.306,.27847,.4596,.01096,.01825,.02087,.01967,.03951,.01325,.13814-.04756,.27675-.09373,.41501-.14092,.09744-.03326,.20474,.01886,.23708,.11597,.03265,.09813-.02081,.20349-.11885,.23559-.18756,.06142-.37502,.12314-.56241,.18501-.11052,.03649-.18614,.00933-.24718-.09003-.03326-.05414-.06599-.10861-.10287-.16936-.04721,.19867-.09267,.38996-.13887,.58441,.06635,.01341,.12959,.02616,.19283,.03899,.03508,.00712,.0705,.01295,.10513,.02186,.09773,.02514,.15971,.08772,.17567,.18711,.03497,.21789,.06599,.43642,.09853,.6547,.01027,.06893,.02023,.1379,.03036,.20685,.01508,.10251-.02121,.1819-.10738,.23891-.00388,.00256-.00755,.00541-.01634,.01173h.48779v-.55252h.55627v-.55665h.5551v-.55551h.92799v.36831h-.55505v.55597h-.55623v.55769h-.55547v.55475h-.55597v.5555h-.55641v.37063h-.36954v-.73967h.55122v-.52852c-.02531-.00213-.05135-.00212-.07648-.00683-.09743-.01823-.17-.09362-.18504-.19175-.03476-.22675-.06879-.45362-.10402-.68029-.00151-.00971-.01093-.02435-.01886-.02597-.15154-.03098-.30342-.06035-.45845-.09069-.01517,.05738-.03011,.1131-.04462,.16893-.03409,.13112-.06827,.26221-.10181,.39347-.0123,.04816-.03581,.08878-.07101,.12417-.1954,.19644-.38986,.39384-.58521,.59035-.08159,.08208-.20181,.09542-.2953,.03463-.12462-.08104-.14395-.25419-.03864-.36029,.17404-.17533,.34943-.34934,.52344-.52471,.01282-.01291,.02322-.03112,.02795-.0487,.0524-.19431,.36639-1.45893,.42598-1.70734,.00218-.0091,.00356-.0184,.00609-.03177l.00003,.00002Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M185.39693,110.03461c.00002-.20565,.16621-.37132,.37154-.37035,.20605,.00097,.36996,.16623,.36945,.37248-.00053,.20402-.16595,.36889-.37016,.3689-.20583,0-.37083-.1651-.3708-.37103h-.00002Z"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <Path
              d="M163.94614,178.36102c-2.367,0-4.286,1.91901-4.286,4.286s1.91901,4.286,4.286,4.286,4.286-1.91901,4.286-4.286-1.91901-4.286-4.286-4.286"
              style={{ fill: "#f58422" }}
            />
            <G>
              <Path
                d="M166.76611,182.32469c.00002-.24551,.00005-.49101-.00006-.73651-.00005-.1209-.04579-.23183-.1288-.31236-.08247-.07999-.19382-.12212-.31342-.11848-.06305,.00189-.12645,.00655-.18776,.01103-.02373,.00174-.04742,.00348-.07117,.00507-.16821,.01125-.33643,.0226-.50462,.03397l-.21581,.01456c-.05136,.00346-.10274,.00668-.15411,.0099-.11462,.00719-.23312,.01462-.34979,.02469-.22672,.01958-.39163,.20062-.39214,.4305-.00017,.07626-.00018,1.23688-.00008,1.65375-.00027,.07951-.00049,.16118,.00023,.24176,.00089,.10085,.03275,.1906,.09467,.26669,.08131,.09995,.19431,.15279,.34546,.16151,.17053,.00987,.34396,.02174,.51169,.03322,.07538,.00516,.15076,.01031,.22614,.01534,.06767,.00449,.13531,.00926,.20297,.01402,.15813,.01112,.32162,.02264,.48293,.03035,.00803,.00038,.01598,.00056,.02391,.00056,.1152,0,.2204-.04019,.29829-.11446,.08473-.08076,.13139-.19577,.13141-.32381,.00003-.24013,.00002-.48024,.00002-.72035v-.31319l.00002-.30779,.00003,.00003Zm-.31461-.72893c.00009,.6902,.00009,1.38042,0,2.07063,0,.04073-.0116,.07332-.03352,.09424-.02156,.02058-.05394,.03052-.09373,.02864-.08183-.00378-.16531-.00981-.24605-.01564-.03526-.00253-.07053-.0051-.10577-.00746l-.24403-.01648c-.15404-.01042-.30809-.02083-.46214-.03113-.04407-.00294-.08813-.00562-.13222-.00829-.08742-.00529-.17783-.01079-.26616-.01843-.06638-.00575-.10458-.0488-.10484-.11809-.00015-.04266-.00011-.08533-.00008-.12799,.00005-.03734,.00008-.07469-.00002-.11203,0-.09862-.00003-.23701-.00006-.3934-.00009-.50708-.00021-1.20152,.00026-1.25954,.00043-.05112,.03297-.09511,.07919-.10698,.01733-.00446,.03773-.00574,.05933-.0071l.01176-.00076c.23531-.01599,.46544-.03133,.72034-.04825,.06325-.00421,.1265-.00851,.18974-.01282,.16444-.01118,.33449-.02277,.50169-.03226,.03894-.00224,.07079,.00731,.09219,.02753,.02231,.02107,.0341,.05414,.0341,.09563l.00002-.00003Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M163.84187,181.68706c-.0005-.22987-.16544-.41093-.39214-.4305-.11665-.01007-.23517-.01752-.34978-.02469-.05138-.00322-.10275-.00644-.15411-.0099l-.21642-.0146c-.16801-.01134-.33601-.02267-.50401-.03391-.02373-.00159-.04744-.00333-.07117-.00507-.06131-.00449-.12471-.00914-.18776-.01103-.11969-.00381-.23096,.03848-.31342,.11848-.08301,.08052-.12875,.19147-.1288,.31235-.00009,.24403-.00008,.48807-.00005,.73209l.00002,.31219v.28511c-.00002,.24948-.00002,.49896,0,.74843,.00002,.12804,.04669,.24303,.13142,.32381,.07791,.07428,.18309,.11446,.29829,.11446,.00792,0,.0159-.0002,.02391-.00056,.16132-.00771,.32481-.01923,.48293-.03035,.06766-.00476,.13531-.00954,.20297-.01402,.07539-.005,.15079-.01016,.22617-.01534,.16772-.01147,.34114-.02336,.51166-.03322,.15115-.00874,.26414-.06158,.34544-.16151,.06194-.07611,.09378-.16585,.09467-.26671,.00072-.08058,.0005-.16228,.00023-.24181,.00012-.41682,.00011-1.57736-.00008-1.6537h.00002Zm-.31445,1.24918c-.00003,.15767-.00005,.29723-.00006,.39659-.00011,.03773-.00006,.07547-.00002,.1132,.00005,.04259,.00009,.08514-.00008,.12772-.00024,.06929-.03847,.11234-.10484,.11809-.08833,.00764-.17874,.01312-.26616,.01843-.04408,.00267-.08817,.00534-.13222,.00829-.15405,.0103-.30811,.02072-.46214,.03113l-.24403,.01648c-.03526,.00238-.07053,.00491-.1058,.00746-.08073,.00583-.1642,.01186-.24603,.01564-.03981,.00185-.07217-.00806-.09373-.02864-.02193-.02092-.03351-.05351-.03351-.09424-.00011-.6902-.00009-1.38042,0-2.07063,0-.04147,.0118-.07454,.0341-.09563,.01936-.0183,.04733-.02783,.08133-.02783,.00356,0,.00717,.00011,.01086,.00031,.16718,.00949,.33722,.02107,.50165,.03226,.06326,.0043,.12651,.00861,.18977,.01282,.25507,.01695,.48532,.03229,.72035,.04825l.01176,.00076c.02161,.00136,.04201,.00264,.05933,.0071,.0462,.01189,.07878,.05586,.07919,.10699,.00047,.05783,.00035,.75002,.00024,1.25543l.00003,.00003Z"
                style={{ fill: "#fff" }}
              />
            </G>
            <G>
              <Path
                d="M164.30273,183.33383l-.05957-.01855c-.06982-.03613-.10547-.11133-.0874-.18359l.00488-.01953,.0498-.07715,.23438-.23535h-1.04199c-.15332-.04004-.19873-.11816-.18652-.19531,.01221-.0791,.07617-.1377,.15576-.14453l1.07471-.00098-.25586-.25391-.03809-.1123c.00049-.04395,.01855-.08398,.05225-.11719l.02051-.02051,.09424-.02734c.04883,0,.09668,.02148,.13525,.05957l.51465,.51367c.05957,.06055,.06201,.19336,.00244,.25391l-.54492,.54395-.10791,.03516h-.0166Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M164.31934,181.99753c.0293,0,.0603,.01343,.08667,.03979l.51416,.51343c.04932,.04919,.05078,.1062,.00269,.15417-.17456,.17468-.34937,.34912-.52441,.52356-.02344,.02344-.05103,.0354-.07861,.0354-.01538,0-.03076-.00366-.04541-.01111-.03784-.01953-.06128-.06128-.05103-.10461,.00537-.02295,.01953-.04639,.03613-.06335,.10693-.10925,.21533-.2168,.32324-.32483,.00806-.00806,.01538-.0166,.02856-.03064h-.52539c-.22778,0-.45557,0-.68335-.00024-.01855-.00012-.03857-.00195-.05591-.00842-.04297-.01624-.0686-.0625-.06152-.10608,.00732-.04614,.0459-.08179,.09277-.08533,.00439-.00037,.00879-.00049,.01318-.00049,.00635,0,.0127,.00024,.01904,.00024h1.19385c.00171-.00305,.00342-.00598,.00488-.00903-.05664-.05542-.11377-.11047-.17041-.16626-.05933-.05872-.11865-.11768-.177-.17725-.04907-.04993-.05151-.10791-.00757-.15149,.01855-.01843,.0415-.02747,.06543-.02747m0-.13977c-.06177,0-.11987,.02429-.16406,.06836-.09839,.09753-.0957,.24414,.00659,.34827,.0376,.03845,.07593,.07678,.11426,.11499h-.87158l-.0376,.00061c-.11157,.00842-.20215,.0918-.21973,.20264-.01782,.11011,.04517,.21912,.15015,.25879,.03076,.01147,.0647,.01709,.10425,.01733l.68433,.00037,.19043-.00012c-.03906,.03931-.07788,.07861-.1167,.11804-.03564,.0365-.06128,.0824-.07227,.12927-.02441,.10327,.02612,.21057,.12305,.26062,.03491,.01782,.07153,.02673,.10938,.02673,.06494,0,.12793-.0271,.17725-.07617l.52466-.5238c.04956-.04956,.07593-.10974,.07593-.17371,0-.04529-.01367-.11304-.07886-.1781l-.51416-.51343c-.052-.052-.11792-.08069-.1853-.08069h0Z"
                style={{ fill: "#f58422" }}
              />
            </G>
            <Text
              transform="translate(155.34326 188.56055)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: "1.07135px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Theater Back Storage Enterance"}
              </TSpan>
            </Text>
          </G>
          <G>
            <G>
              <Path
                d="M135.55904,194.74812c-2.367,0-4.286,1.91901-4.286,4.286s1.91901,4.286,4.286,4.286,4.286-1.91901,4.286-4.286-1.91901-4.286-4.286-4.286"
                style={{ fill: "#f58422" }}
              />
              <Text
                transform="translate(131.25915 204.92371)"
                style={{
                  fill: "#1b4459",
                  fontFamily: "Poppins-Regular, Poppins",
                  fontSize: "1.07135px",
                }}
              >
                <TSpan x={0} y={0}>
                  {"Theater Storage"}
                </TSpan>
              </Text>
            </G>
            <G>
              <G>
                <Path
                  d="M135.3584,201.10889h-1.91846v-1.91846h1.91846v1.91846Zm-1.45947-.45898h1.00049v-1.00049h-1.00049v1.00049Z"
                  style={{ fill: "#fff" }}
                />
                <Path
                  d="M137.67822,201.10889h-1.91846v-1.91846h1.91846v1.91846Zm-1.45947-.45898h1.00049v-1.00049h-1.00049v1.00049Z"
                  style={{ fill: "#fff" }}
                />
              </G>
              <Path
                d="M136.51855,198.87793h-1.91895v-1.91846h1.91895v1.91846Zm-1.45996-.45898h1.00098v-1.00049h-1.00098v1.00049Z"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <Path
              d="M179.98383,237.78485c-2.19601,0-3.97639,1.78038-3.97639,3.97639s1.78036,3.97639,3.97639,3.97639,3.97638-1.78038,3.97638-3.97639-1.78036-3.97639-3.97638-3.97639"
              style={{ fill: "#5767af" }}
            />
            <G>
              <Path
                d="M179.93463,239.28499c-.03488,.00018-.06354-.00854-.06586-.05019-.00179-.03381,.02171-.05161,.06798-.05232,.03969-.00053,.07938,0,.12546,0-.01389-.15002-.06619-.27495-.16533-.39259-.03133,.0347-.05943,.06674-.08862,.09789-.02332,.0251-.05,.03416-.07866,.00908-.02403-.02118-.02171-.05392,.00783-.08221,.03061-.02954,.06389-.05643,.09824-.08649-.12083-.10144-.24666-.15411-.39401-.16621,0,.0452-.00072,.08649,.00018,.12778,.00072,.03612-.01122,.06282-.05054,.06638-.03275,.00302-.05214-.02348-.05251-.06816-.00037-.04129,0-.0824,0-.12617-.14789,.01353-.27406,.06496-.39099,.16444,.0331,.03061,.06354,.05836,.0938,.08649,.02615,.02438,.03683,.05214,.01086,.0824-.02153,.02509-.05161,.02225-.0817-.0089-.02936-.03026-.05606-.06335-.08649-.09805-.10019,.1219-.1552,.24612-.16479,.39436,.04466,0,.08311-.00037,.12155,0,.04768,.00053,.06976,.01637,.07047,.05,.00089,.03542-.02153,.05197-.07208,.05251-.03915,.00037-.07829,0-.12102,0,.01282,.15038,.06602,.27495,.16266,.39011,.03168-.03346,.06087-.06442,.09041-.09503,.02348-.02457,.04984-.03453,.07884-.00961,.02438,.021,.02171,.05321-.00694,.0824-.02991,.03008-.06104,.05891-.0938,.09041,.11621,.09752,.24185,.15002,.38921,.16196,0-.04485,.00053-.08614-.00018-.12724-.00072-.03595,.0105-.063,.05035-.06619,.0331-.00267,.05214,.02296,.05251,.06798,.00037,.04129,.00018,.0824,.00018,.12582,.14807-.01247,.2739-.06496,.39117-.16389-.03365-.03114-.06461-.05836-.09396-.08739-.02991-.02954-.0331-.05943-.01086-.08221,.02278-.02332,.05179-.02118,.08205,.00943,.02954,.03008,.05695,.06229,.08507,.09306,.09164-.08595,.17921-.30325,.15839-.38956h-.11888l.00003-.00005Zm-.29951-.00125c-.06602,.00018-.18152,.00037-.25093-.00089-.03024-.00053-.04501-.02332-.0452-.05267-.00037-.08934-.00018-.2755,0-.36517,0-.02794,.0226-.05035,.05054-.05035h.00142c.02794,0,.05054,.0226,.05054,.05054v.31731h.19345c.01405,0,.02652,.00569,.03577,.01477,.00908,.00925,.01477,.02171,.01477,.03577,0,.02794-.02242,.05054-.05035,.05072v-.00002Z"
                style={{ fill: "#fff" }}
              />
              <G>
                <Path
                  d="M181.46725,241.87473c.00304-.02029,.01103-.04004,.01389-.06052,.03667-.26321,.09824-.52606,.10251-.78998,.00552-.32922-.134-.40897-.43549-.29507-.13187,.04984-.14807,.04378-.21677-.08008-.15732-.28403-.46111-.45755-.7802-.45309-.31909-.00446-.62286,.16907-.7802,.45309-.0687,.12386-.08488,.12991-.21677,.08008-.30147-.11391-.44099-.03416-.43549,.29507,.00427,.26392,.06586,.52676,.10251,.78998,.00285,.02048,.01086,.04022,.01389,.06052,.01138,.07759,.04431,.12367,.12671,.15678,.168,.06728,.25539,.20609,.26143,.38885,.00374,.11443,.00072,.22903,.00072,.36108,.16995-.11124,.3474-.08311,.52019-.08418,.1356-.00089,.27122-.00107,.407-.00107s.27139,.00018,.407,.00107c.17281,.00107,.35023-.02705,.52019,.08418,0-.13205-.00304-.24666,.00072-.36108,.00604-.18277,.09343-.32158,.26143-.38885,.0824-.0331,.11533-.07919,.12671-.15678h.00003Z"
                  style={{ fill: "#fff" }}
                />
                <Path
                  d="M181.52039,242.22984c-.12669,0-.2294,.10271-.2294,.22939v2.17334h.45879v-2.17334c0-.12669-.10271-.22939-.2294-.22939h.00002Z"
                  style={{ fill: "#fff" }}
                />
                <Path
                  d="M180.79614,242.90941h-1.28989c-.15518,0-.28101,.12582-.28101,.28101v.2762h1.85188v-.2762c0-.15518-.12582-.28101-.28101-.28101h.00002Z"
                  style={{ fill: "#fff" }}
                />
                <Path
                  d="M178.78204,242.22984c-.12669,0-.2294,.10271-.2294,.22939v2.17334h.45879v-2.17334c0-.12669-.10271-.22939-.2294-.22939h.00002Z"
                  style={{ fill: "#fff" }}
                />
              </G>
            </G>
            <Text
              transform="translate(175.2923 247.4926)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: "1.07135px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Center Hall Lobby"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M116.69151,398.56519c-2.367,0-4.286,1.91901-4.286,4.28601s1.919,4.28601,4.286,4.28601,4.286-1.91901,4.286-4.28601-1.919-4.28601-4.286-4.28601"
              style={{ fill: "#f58422" }}
            />
            <G>
              <Path
                d="M115.15285,404.8624c-.1709-.04584-.31286-.13202-.38784-.29919-.08454-.18848-.08591-.38785,.05671-.53693,.33492-.35013,.68903-.68188,1.04598-1.03146,.06452,.0726,.13732,.15451,.2142,.24103,.03435-.03201,.05618-.05115,.07669-.07162,.4112-.41034,.82165-.82147,1.23421-1.23044,.04353-.04315,.06451-.08566,.062-.14774-.0047-.116-.00363-.23239,.00036-.34845,.00095-.0275,.01564-.06857,.0364-.07919,.31721-.1622,.63648-.3204,.95223-.478,.01069,.00723,.01633,.00986,.02042,.01401,.07507,.07632,.19382,.1438,.21197,.23193,.01666,.0809-.07377,.18484-.11954,.27737-.10799,.21829-.21918,.43503-.32512,.65433-.02438,.05045-.05361,.07489-.10878,.06577-.0029-.00049-.00595-.00009-.00893-.00006-.13963,.00232-.29415-.03186-.41465,.01733-.11745,.04794-.20079,.18042-.2979,.27701-.33373,.33194-.66695,.66437-1.00024,.99673-.01874,.01868-.03627,.0386-.06404,.06827,.08673,.07712,.17091,.15198,.27809,.24731-.04735,.0336-.08238,.05185-.10916,.07843-.27061,.26865-.54221,.53641-.80838,.80942-.11011,.11295-.22525,.21072-.3838,.24411h-.1609v.00003Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M115.65341,400.84c.1781,.04111,.34678,.10065,.48093,.2334,.20108,.19897,.29039,.43744,.25866,.71942-.01348,.11975,.01856,.22437,.10263,.31058,.06426,.06592,.13192,.12851,.19661,.19119-.06579,.06659-.12515,.12668-.19489,.1973-.07863-.08215-.15738-.16672-.23876-.24866-.0654-.06586-.13041-.07211-.17836-.01868-.05676,.06323-.03262,.11978,.01954,.17188,.08198,.08188,.16401,.1637,.24162,.24115-.05963,.06506-.1168,.12744-.18549,.20239-.0594-.06476-.11431-.12723-.17204-.18695-.09026-.09338-.19837-.13184-.33055-.11887-.54872,.05374-.98112-.36493-.94657-.91486,.00198-.03152,.02508-.06171,.03834-.0925,.02707,.01425,.05882,.02347,.08037,.04361,.07614,.07114,.14736,.14755,.22309,.21918,.14079,.13315,.31347,.13248,.45395-.00095,.05398-.05127,.10718-.10361,.15733-.15857,.11938-.1308,.11853-.3064-.00285-.43478-.07569-.08005-.15335-.15851-.23382-.2337-.05564-.052-.04677-.08841,.01572-.12152h.21453l.00003-.00006Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M117.0819,403.06729c.06462-.06641,.12239-.12576,.20158-.20715,.01203,.02325,.01852,.04871,.03448,.06476,.36349,.36545,.72848,.7294,1.09206,1.09476,.10682,.10733,.1491,.2359,.10273,.38391-.04236,.13522-.13492,.2233-.2735,.25519-.1234,.02841-.24056,.00543-.33141-.08514-.38816-.3869-.77336-.77679-1.16455-1.17053,.05975-.05457,.12187-.11127,.18849-.17212,.01605,.01529,.03983,.03702,.06258,.05978,.33296,.33279,.66574,.66574,.99872,.9985,.02104,.02103,.04153,.0433,.06549,.06052,.05126,.03687,.11132,.03424,.14149-.01617,.02107-.03522,.01295-.09238,.00597-.13794-.00332-.02167-.03399-.03949-.05291-.05838-.35613-.35583-.71236-.71158-1.07122-1.07001l.00002,.00003Z"
                style={{ fill: "#fff" }}
              />
            </G>
            <Text
              transform="translate(110.84542 409.47707)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: "1.07135px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Mechanical Room SW"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M60.4637,349.58386c-2.367,0-4.286,1.91901-4.286,4.28601s1.919,4.28601,4.286,4.28601,4.286-1.91901,4.286-4.28601-1.919-4.28601-4.286-4.28601"
              style={{ fill: "#f58422" }}
            />
            <G>
              <G>
                <Path
                  d="M60.26318,355.94434h-1.91846v-1.91797h1.91846v1.91797Zm-1.45947-.45898h1.00049v-1h-1.00049v1Z"
                  style={{ fill: "#fff" }}
                />
                <Path
                  d="M62.58301,355.94434h-1.91895v-1.91797h1.91895v1.91797Zm-1.45996-.45898h1.00098v-1h-1.00098v1Z"
                  style={{ fill: "#fff" }}
                />
              </G>
              <Path
                d="M61.42285,353.71387h-1.91846v-1.91895h1.91846v1.91895Zm-1.45947-.45898h1.00049v-1.00098h-1.00049v1.00098Z"
                style={{ fill: "#fff" }}
              />
            </G>
            <Text
              transform="translate(55.18432 359.7601)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: "1.07135px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Theater Storage SW"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M60.75403,303.03546c-2.367,0-4.286,1.91901-4.286,4.28601s1.919,4.28601,4.286,4.28601,4.286-1.91901,4.286-4.28601-1.919-4.28601-4.286-4.28601"
              style={{ fill: "#f58422" }}
            />
            <G>
              <G>
                <Path
                  d="M60.55371,309.39648h-1.91895v-1.91895h1.91895v1.91895Zm-1.45996-.45898h1.00098v-1.00098h-1.00098v1.00098Z"
                  style={{ fill: "#fff" }}
                />
                <Path
                  d="M62.87305,309.39648h-1.91846v-1.91895h1.91846v1.91895Zm-1.45947-.45898h1.00049v-1.00098h-1.00049v1.00098Z"
                  style={{ fill: "#fff" }}
                />
              </G>
              <Path
                d="M61.71338,307.16504h-1.91846v-1.91797h1.91846v1.91797Zm-1.45947-.45898h1.00049v-1h-1.00049v1Z"
                style={{ fill: "#fff" }}
              />
            </G>
            <Text
              transform="translate(55.46863 313.21113)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: "1.07135px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Theater Storage SW"}
              </TSpan>
            </Text>
          </G>
          <G>
            <G>
              <Path
                d="M204.05623,425.03442c-1.52776,0-2.76636,1.23859-2.76636,2.76636s1.2386,2.76636,2.76636,2.76636,2.76636-1.23859,2.76636-2.76636-1.2386-2.76636-2.76636-2.76636"
                style={{ fill: "#5767af" }}
              />
              <Text
                transform="translate(199.90811 431.67511)"
                style={{
                  fill: "#1b4459",
                  fontFamily: "Poppins-Regular, Poppins",
                  fontSize: "1.07135px",
                }}
              >
                <TSpan x={0} y={0}>
                  {"Main Enterance"}
                </TSpan>
              </Text>
            </G>
            <G>
              <Path
                d="M206.04498,427.58173c.00002-.17575,.00003-.35147-.00005-.52722-.00003-.08655-.03278-.16595-.09219-.2236-.05904-.05725-.13873-.0874-.22435-.08481-.04514,.00134-.09052,.00467-.1344,.0079-.01698,.00125-.03395,.0025-.05093,.00363-.12041,.00806-.24081,.01617-.36122,.02432l-.15448,.01041c-.03676,.00247-.07355,.00479-.11031,.00708-.08205,.00516-.16689,.01047-.2504,.01767-.16228,.01401-.28033,.14362-.2807,.30817-.00012,.0546-.00014,.88538-.00005,1.18378-.0002,.05692-.00035,.11539,.00015,.17307,.00064,.0722,.02344,.13644,.06776,.19092,.0582,.07153,.13908,.10938,.24728,.11563,.12207,.00708,.24622,.01556,.36627,.02377,.05396,.00369,.10791,.00739,.16188,.01096,.04845,.00323,.09686,.00662,.14529,.01004,.11319,.00797,.23022,.0162,.34569,.02173,.00574,.00027,.01144,.0004,.01712,.0004,.08246,0,.15778-.02878,.21353-.08194,.06065-.05783,.09406-.14014,.09407-.23178,.00002-.17188,.00002-.34375,.00002-.51562v-.44449Zm-.2252-.52179c.00008,.49405,.00008,.98813,0,1.48218,0,.02917-.0083,.05249-.02399,.06747-.01543,.01474-.0386,.02185-.06709,.02051-.05858-.00272-.11833-.00702-.17612-.0112-.02524-.00183-.05048-.00363-.07571-.00534l-.17468-.01181c-.11028-.00745-.22054-.01492-.33081-.02228-.03154-.00211-.0631-.00403-.09464-.00595-.06258-.00381-.12729-.00772-.19052-.01321-.04752-.00412-.07486-.03494-.07504-.08453-.00011-.03055-.00008-.06107-.00005-.09161,.00003-.02673,.00006-.05347-.00002-.0802,0-.07059-.00002-.16965-.00005-.28159-.00006-.36298-.00015-.86008,.00018-.90158,.00031-.03659,.02361-.06808,.05669-.07657,.01241-.0032,.02701-.00412,.04247-.00507l.00842-.00055c.16843-.01144,.33318-.02243,.51562-.03455,.04527-.00302,.09055-.0061,.13582-.00916,.11771-.008,.23943-.0163,.35912-.0231,.02786-.00159,.05067,.00522,.06599,.01971,.01598,.01508,.02441,.03876,.02441,.06845l-.00002-.00003Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M203.95177,427.12531c-.00037-.16455-.11842-.29416-.2807-.30817-.08351-.0072-.16833-.01254-.25038-.01767-.03677-.00232-.07356-.00461-.11032-.00708l-.15492-.01044c-.12025-.00812-.24052-.01624-.36079-.02429-.01698-.00113-.03397-.00238-.05093-.00363-.04388-.00323-.08926-.00656-.1344-.0079-.08568-.00272-.16531,.02756-.22435,.08481-.05942,.05765-.09216,.13705-.09219,.2236-.00008,.17468-.00005,.34937-.00005,.52405v.42755c0,.17859-.00002,.35715,.00002,.53574,.00002,.09164,.03342,.17395,.09407,.23178,.05577,.05316,.13106,.08194,.21353,.08194,.00568,0,.01138-.00015,.01711-.0004,.11546-.00552,.2325-.01376,.34567-.02173,.04843-.00342,.09686-.00681,.14529-.01004,.05397-.0036,.10794-.00729,.1619-.01096,.12006-.00821,.24419-.01672,.36626-.02377,.1082-.00626,.18909-.04407,.24728-.11563,.04433-.05447,.06712-.11871,.06776-.19092,.0005-.05768,.00037-.11615,.00017-.1731,.00009-.29837,.00008-1.12909-.00005-1.18375h.00003Zm-.22508,.89417c-.00002,.11285-.00005,.21277-.00005,.28387-.00008,.02701-.00005,.05402-.00002,.08105,.00003,.03049,.00006,.06094-.00005,.09143-.00018,.04959-.02753,.08041-.07504,.08453-.06323,.00549-.12794,.0094-.19052,.01321-.03156,.00192-.06311,.00385-.09464,.00595-.11028,.00739-.22054,.01483-.33081,.02228l-.17468,.01181c-.02525,.00171-.05049,.00351-.07573,.00534-.05779,.00418-.11754,.00848-.17612,.0112-.0285,.00131-.05167-.00577-.06709-.02051-.01569-.01498-.02399-.0383-.02399-.06747-.00008-.49405-.00008-.98813,0-1.48218,0-.02969,.00845-.05338,.02441-.06845,.01387-.01309,.03387-.01993,.05823-.01993,.00253,0,.00514,.00009,.00777,.00024,.11967,.00681,.24139,.01508,.35909,.0231,.04527,.00308,.09056,.00616,.13583,.00916,.18259,.01215,.3474,.0231,.51564,.03455l.00842,.00055c.01546,.00098,.03006,.00189,.04247,.00507,.03308,.00851,.0564,.03998,.05669,.07657,.00034,.04141,.00024,.53687,.00018,.89865v-.00003Z"
                style={{ fill: "#fff" }}
              />
            </G>
            <G>
              <Path
                d="M204.23891,428.29099l-.03516-.01758-.02783-.11426,.20996-.23828h-.74854c-.11035-.0293-.14258-.08496-.1333-.14062l.00684-.03906,.10596-.0625,.85352-.00098-.12646-.04004-.12744-.12695c-.0542-.05566-.05615-.12793-.00488-.17871,.04785-.01465,.08154-.01953,.10693-.01953,.03711,0,.05615,.01172,.07227,.02832l.36816,.36719c.05469,.05469,.05566,.12695,.00195,.18066l-.39014,.38965-.07715,.02539-.05469-.0127Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M204.29359,427.3475c.021,0,.04321,.00964,.06201,.0285,.12256,.12256,.24536,.24506,.36792,.36755,.0354,.03516,.03638,.07599,.00195,.11035-.125,.125-.25,.24994-.37524,.37476-.01685,.01678-.03662,.02539-.0564,.02539-.01099,0-.02197-.00269-.03247-.008-.0271-.01398-.04395-.04388-.03662-.07489,.00391-.01636,.01416-.0332,.02612-.04535,.07642-.07819,.15405-.15515,.2312-.23254,.00586-.00574,.01123-.01184,.02051-.02185h-.27051c-.19824,0-.39648,0-.59473-.00024-.01343,0-.02759-.00134-.04004-.00598-.03076-.0116-.04907-.04474-.04419-.07593,.00537-.03308,.03296-.05853,.06641-.0611,.00317-.00024,.00635-.00031,.00952-.00031,.00464,0,.00903,.00012,.01367,.00012h.85474c.00098-.00214,.0022-.00433,.00342-.00647-.04077-.03967-.08154-.0791-.12207-.11902-.04248-.04205-.08472-.08423-.12671-.12689-.03516-.03577-.03687-.07715-.00537-.1084,.01318-.01318,.02954-.01971,.04688-.01971m0-.09998c-.04419,0-.08594,.0174-.11768,.04901-.07031,.06976-.06836,.17468,.00488,.24915l.08203,.08234h-.62402l-.02686,.00043c-.07983,.0061-.14478,.06567-.15747,.14484-.01245,.07953,.03271,.15729,.10767,.18549,.02246,.00842,.04688,.01239,.0752,.01239l.59473,.00024h.03076c-.02808,.02808-.05591,.05621-.0835,.08453-.02539,.02576-.04395,.05847-.05176,.09198-.01758,.07446,.01855,.15125,.08789,.18701,.0249,.01276,.05127,.0191,.07837,.0191,.04663,0,.0918-.01941,.1272-.05463l.37524-.37482c.03564-.03558,.05444-.07867,.05444-.12457,0-.03247-.01001-.08093-.05664-.12738l-.16406-.16388-.20361-.20343c-.0376-.03735-.08472-.0578-.13281-.0578h0Z"
                style={{ fill: "#5768b0" }}
              />
            </G>
          </G>
          <G>
            <Path
              d="M541.39355,420.91861c0-.931,.75702-1.689,1.68903-1.689,.93103,0,1.68903,.758,1.68903,1.689s-.758,1.68903-1.68903,1.68903c-.93201,0-1.68903-.758-1.68903-1.68903m-2.59705,0c0,2.367,1.91901,4.28601,4.28601,4.28601s4.28601-1.91901,4.28601-4.28601-1.91901-4.28598-4.28601-4.28598-4.28601,1.91901-4.28601,4.28598"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(539.8584 426.60352)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".77907px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Electrical Rooms"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M621.62988,355.02209c-2.35986,0-4.27979,1.91998-4.27979,4.29004s1.91992,4.28998,4.27979,4.28998c2.37012,0,4.29004-1.91998,4.29004-4.28998s-1.91992-4.29004-4.29004-4.29004Zm0,5.98004c-.92993,0-1.68994-.76001-1.68994-1.69,0-.93005,.76001-1.69,1.68994-1.69,.93018,0,1.69019,.75995,1.69019,1.69,0,.92999-.76001,1.69-1.69019,1.69Z"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(618.14087 365.09197)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".81359px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Equipment Room"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M579.05383,393.61218c0-.931,.75702-1.689,1.68903-1.689,.93103,0,1.68903,.758,1.68903,1.689s-.758,1.68903-1.68903,1.68903c-.93201,0-1.68903-.758-1.68903-1.68903m-2.59705,0c0,2.367,1.91901,4.28601,4.28601,4.28601s4.28601-1.91901,4.28601-4.28601-1.91901-4.28598-4.28601-4.28598-4.28601,1.91901-4.28601,4.28598"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(579.14151 399.30341)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".81359px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Storage"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M582.64777,419.92877c0-.931,.75702-1.689,1.68903-1.689,.93103,0,1.68903,.758,1.68903,1.689s-.758,1.68903-1.68903,1.68903c-.93201,0-1.68903-.758-1.68903-1.68903m-2.59705,0c0,2.367,1.91901,4.28601,4.28601,4.28601s4.28601-1.91901,4.28601-4.28601-1.91901-4.28598-4.28601-4.28598-4.28601,1.91901-4.28601,4.28598"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(581.04282 425.61266)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".77907px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Telephone Rooms"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M609.09277,419.46078c0-.62256,.50623-1.12943,1.12946-1.12943,.62256,0,1.12946,.50687,1.12946,1.12943s-.5069,1.12946-1.12946,1.12946c-.62323,0-1.12946-.50687-1.12946-1.12946m-1.73663,0c0,1.58282,1.28326,2.86609,2.86609,2.86609s2.86609-1.28326,2.86609-2.86609-1.28326-2.86606-2.86609-2.86606-2.86609,1.28326-2.86609,2.86606"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(607.24557 423.40458)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".77907px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Storage Rooms"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M147.25107,27.30683v-7.40255h10.9705v7.40255h-10.9705Zm7.41736-4.33971c.00771,.01413,.01289,.02103,.0155,.02881,.09721,.28985,.1951,.57948,.28961,.87021,.00836,.02571,.00153,.06174-.00999,.08777-.3717,.83938-.74489,1.6781-1.11775,2.51697-.0419,.09427-.08318,.18882-.12469,.28314,.01155,.00517,.01543,.00843,.01932,.00844,.24696,.00053,.49396,.00177,.74089-.00083,.01907-.0002,.04608-.02356,.05542-.0429,.05107-.10579,.0976-.21377,.146-.32084,.22855-.50541,.45708-1.01082,.68585-1.51612,.07024-.15512,.14119-.3099,.21523-.4723,.01012,.01901,.01698,.02962,.02171,.0411,.15614,.37951,.31313,.75868,.46674,1.13921,.01968,.04874,.04173,.06692,.09584,.0666,.42957-.00249,.85916-.00139,1.28876-.00139h.07089v-.64302h-.08533c-.26709,0-.53419-.00122-.80127,.00115-.04683,.00041-.06372-.01304-.07497-.05926-.0677-.27799-.13766-.55546-.21077-.83208-.05434-.20559-.10201-.41428-.17563-.61307-.07838-.2116-.18405-.41308-.27734-.61918-.03679-.08128-.07236-.16312-.11121-.2509,.20355,0,.39493-.00114,.58624,.00179,.01878,.00029,.04588,.02148,.05435,.0398,.06136,.13297,.11873,.26779,.17776,.40185,.04077,.09259,.08215,.18491,.12431,.27968,.15096-.0656,.29459-.12802,.43633-.18961-.0009-.0109-.00015-.01567-.00175-.01943-.13757-.32-.27589-.63969-.41232-.96017-.01617-.03801-.04317-.03681-.07474-.0368-.70319,.00025-1.40637,.00057-2.10954-.00076-.04314-.00008-.0677,.01381-.09135,.04971-.18709,.28395-.37717,.56594-.56432,.84986-.02612,.03963-.05408,.05823-.10254,.05625-.08665-.00355-.17357-.00099-.26038-.00098h-.30856v.48239h.08051c.20032,0,.40065,.0005,.60097-.00022,.09096-.00033,.19585,.02448,.26895-.01249,.0732-.03701,.11499-.13654,.16989-.20917,.10017-.13255,.19987-.26547,.3035-.40318l-.00011-.00003Zm-5.70097-.45217c.05981-.42061,.11713-.82371,.17522-1.2322-.01453,.00476-.02151,.00531-.02628,.00886-.19054,.14233-.38135,.28432-.57045,.42855-.01675,.01278-.02882,.03935-.032,.06113-.05827,.39989-.11501,.8-.17168,1.20012-.01859,.13122-.03603,.2626-.05457,.39814,.07758,.01147,.14961,.02243,.22177,.03273,.45094,.06434,.90205,.12762,1.35269,.19416,.04643,.00686,.08096-.0012,.11658-.02848,.0899-.06888,.18143-.13565,.27199-.20369,.09692-.07282,.19348-.14614,.30347-.22927-.41701-.05955-.81693-.11665-1.23589-.17648,.47215-.35453,.92773-.69661,1.38647-1.04106-.11824-.15692-.23111-.30672-.34549-.45852-.46321,.34811-.9193,.69088-1.39185,1.04601Zm.6674,2.54643h1.13939v-1.00325h1.05573v-.94334h.86453v-.28145h-1.15257v.94148h-1.05515v1.00339h-1.14207v.99754h-1.11256v1.09202h.28232v-.80992h1.12038v-.99648h.00002Zm5.66685-3.62145c.00162-.30957-.24857-.56423-.55563-.56555-.30672-.00131-.56158,.25265-.56166,.55966-.00006,.30684,.24808,.55863,.5519,.56003,.31113,.00143,.56377-.2462,.56538-.55414h.00002Z"
              style={{ fill: "#007f02" }}
            />
            <Path
              d="M154.66843,22.96393c-.10361,.13771-.20329,.27063-.3035,.40318-.05489,.07263-.09669,.17216-.16989,.20917-.0731,.03696-.17799,.01216-.26895,.01249-.20032,.00072-.40065,.00022-.60097,.00022h-.08051v-.48239h.30856c.08681,0,.17372-.00257,.26038,.00098,.04848,.00199,.07642-.01661,.10254-.05625,.18713-.28392,.37721-.5659,.56432-.84986,.02365-.0359,.04822-.04979,.09135-.04971,.70319,.00133,1.40637,.00101,2.10954,.00076,.03159,0,.05856-.00121,.07474,.0368,.13643,.32049,.27475,.64017,.41232,.96017,.00162,.00376,.00087,.00853,.00175,.01943-.14174,.0616-.28537,.12401-.43633,.18961-.04214-.09477-.08354-.18709-.12431-.27968-.05902-.13406-.11639-.26887-.17776-.40185-.00845-.01832-.03557-.03951-.05435-.0398-.19131-.00292-.38269-.00179-.58624-.00179,.03886,.08778,.07442,.16962,.11121,.2509,.09331,.20611,.19897,.40758,.27734,.61918,.07362,.19879,.12129,.40748,.17563,.61307,.0731,.27662,.14307,.55409,.21077,.83208,.01126,.04622,.02815,.05967,.07497,.05926,.26707-.00236,.53418-.00115,.80127-.00115h.08533v.64302h-.07089c-.4296,0-.85918-.0011-1.28876,.00139-.05409,.00031-.07616-.01786-.09584-.0666-.15361-.38053-.31059-.7597-.46674-1.13921-.00471-.01148-.0116-.02209-.02171-.0411-.07404,.1624-.14499,.31718-.21523,.4723-.22878,.5053-.45731,1.01071-.68585,1.51612-.04842,.10707-.09492,.21505-.146,.32084-.00934,.01934-.03635,.0427-.05542,.0429-.24693,.0026-.49393,.00136-.74089,.00083-.00389,0-.00777-.00326-.01932-.00844,.04152-.09432,.08279-.18887,.12469-.28314,.37286-.83887,.74603-1.67759,1.11775-2.51697,.01154-.02603,.01836-.06205,.00999-.08777-.09451-.29073-.1924-.58036-.28961-.87021-.00261-.00777-.0078-.01468-.0155-.02881l.00011,.00003Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M148.96745,22.51176c.47255-.35513,.92863-.6979,1.39185-1.04601,.11438,.1518,.22725,.3016,.34549,.45852-.45872,.34445-.91432,.68653-1.38647,1.04106,.41898,.05983,.81889,.11694,1.23589,.17648-.10999,.08313-.20654,.15644-.30347,.22927-.09056,.06804-.18208,.13481-.27199,.20369-.03561,.02728-.07014,.03534-.11658,.02848-.45062-.06654-.90173-.12981-1.35269-.19416-.07214-.01029-.1442-.02126-.22177-.03273,.01854-.13553,.03598-.26692,.05457-.39814,.05666-.40012,.1134-.80023,.17168-1.20012,.00317-.02178,.01524-.04836,.032-.06113,.1891-.14422,.37991-.28622,.57045-.42855,.00476-.00355,.01175-.0041,.02628-.00886-.05809,.40849-.11542,.81159-.17522,1.2322Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M149.63487,25.05819v.99648h-1.12038v.80992h-.28232v-1.09202h1.11256v-.99754h1.14207v-1.00339h1.05515v-.94148h1.15257v.28145h-.86453v.94334h-1.05573v1.00325h-1.1394Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M155.30173,21.43673c-.00162,.30794-.25426,.55557-.56538,.55414-.30383-.0014-.55197-.25318-.5519-.56003,.00006-.30701,.25493-.56097,.56166-.55966,.30705,.00131,.55725,.25597,.55563,.56555h-.00002Z"
              style={{ fill: "#fff" }}
            />
          </G>
          <G>
            <Path
              d="M496.39539,11.50153c.931,0,1.689,.75699,1.689,1.689,0,.931-.758,1.689-1.689,1.689s-1.68903-.758-1.68903-1.689c0-.93201,.758-1.689,1.68903-1.689m0-2.59702c-2.367,0-4.28601,1.91901-4.28601,4.28601s1.91901,4.28601,4.28601,4.28601,4.28598-1.91901,4.28598-4.28601-1.91901-4.28601-4.28598-4.28601"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(491.26799 18.94135)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".80432px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Loading/Unloading Doors"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M580.6499,335.79202c-2.36987,0-4.29004,1.91998-4.29004,4.27997,0,2.37,1.92017,4.28998,4.29004,4.28998,2.37012,0,4.29004-1.91998,4.29004-4.28998,0-2.35999-1.91992-4.27997-4.29004-4.27997Z"
              style={{ fill: "#0f3ee8" }}
            />
            <G>
              <Path
                d="M580.64966,336.70676c-.289,0-.52405,.23505-.52405,.52405,0,.2894,.23505,.52405,.52405,.52405,.28937,0,.52441-.23465,.52441-.52405,0-.289-.23505-.52405-.52441-.52405h0Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M581.75665,340.61548c.12115,0,.21893-.09778,.21893-.21896v-1.86639c0-.30106-.24469-.54578-.54578-.54578h-1.56085c-.30066,0-.54541,.24472-.54541,.54578v1.86639c0,.12115,.09821,.21896,.21857,.21896,.12079,0,.21893-.09778,.21893-.21896v-1.6265h.18396v4.38239c0,.16101,.1308,.29181,.29224,.29181,.16101,0,.29224-.13083,.29224-.29181v-2.53693h.23706v2.53693c0,.16101,.1308,.29181,.29181,.29181s.29181-.13083,.29181-.29181v-4.38239h.18756v1.6265c0,.12115,.09821,.21896,.21893,.21896h0Z"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <Path
              d="M649.37115,38.38708c.93103,0,1.68903,.757,1.68903,1.689,0,.931-.758,1.689-1.68903,1.689s-1.68903-.758-1.68903-1.689c0-.932,.758-1.689,1.68903-1.689m0-2.597c-2.367,0-4.28601,1.919-4.28601,4.286s1.91901,4.286,4.28601,4.286,4.28601-1.919,4.28601-4.286-1.91901-4.286-4.28601-4.286"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(644.32971 46.61035)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: "1.07133px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Main Loading Dock"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M689.04004,275.94159c-2.37012,0-4.29004,1.91998-4.29004,4.28998,0,2.36005,1.91992,4.28003,4.29004,4.28003,2.35986,0,4.28003-1.91998,4.28003-4.28003,0-2.37-1.92017-4.28998-4.28003-4.28998Zm0,5.97998c-.93018,0-1.68994-.75995-1.68994-1.69,0-.92999,.75977-1.69,1.68994-1.69,.92993,0,1.68994,.76001,1.68994,1.69,0,.93005-.76001,1.69-1.68994,1.69Zm0-5.97998c-2.37012,0-4.29004,1.91998-4.29004,4.28998,0,2.36005,1.91992,4.28003,4.29004,4.28003,2.35986,0,4.28003-1.91998,4.28003-4.28003,0-2.37-1.92017-4.28998-4.28003-4.28998Zm0,5.97998c-.93018,0-1.68994-.75995-1.68994-1.69,0-.92999,.75977-1.69,1.68994-1.69,.92993,0,1.68994,.76001,1.68994,1.69,0,.93005-.76001,1.69-1.68994,1.69Z"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(684.05395 286.18762)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: "1.07133px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Security/Receiving"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M576.94995,138.23206c-2.36987,0-4.29004,1.91998-4.29004,4.27997,0,2.37,1.92017,4.28998,4.29004,4.28998,2.37012,0,4.29004-1.91998,4.29004-4.28998,0-2.35999-1.91992-4.27997-4.29004-4.27997Z"
              style={{ fill: "#0f3ee8" }}
            />
            <G>
              <Path
                d="M578.39343,142.49648l-.42328-1.49689-.00519-.00891c-.07422-.25078-.30719-.42438-.56647-.42438h-.89996c-.26263,0-.4964,.17657-.56793,.4296l-.42401,1.50058c-.0304,.10686,.03229,.21925,.13873,.2493,.10754,.03116,.21924-.03191,.24927-.13911l.4151-1.46498-.0011,.52975-.55017,1.94354h.55127v1.73802c0,.14838,.12054,.26897,.26862,.26897,.14838,0,.26935-.12057,.26935-.26897v-1.73802h.21851v1.73802c0,.14838,.12091,.26897,.26929,.26897,.14801,0,.26898-.12057,.26898-.26897v-1.73802h.52008l-.52008-1.84077v-.58466l.401,1.41711c.03003,.10721,.14282,.17027,.24896,.13911,.10681-.03004,.16956-.14246,.1391-.2493"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M576.94977,139.41211c-.26636,0-.48303,.21664-.48303,.48302,0,.26674,.21667,.48302,.48303,.48302,.26672,0,.4834-.21626,.4834-.48302,0-.26636-.21667-.48302-.4834-.48302"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <Path
              d="M576.94995,160.08698c-2.36987,0-4.29004,1.91998-4.29004,4.28998s1.92017,4.29004,4.29004,4.29004c2.37012,0,4.29004-1.92004,4.29004-4.29004s-1.91992-4.28998-4.29004-4.28998Z"
              style={{ fill: "#0f3ee8" }}
            />
            <G>
              <Path
                d="M576.94971,161.00723c-.289,0-.52405,.23506-.52405,.52405,0,.28941,.23505,.52405,.52405,.52405,.28937,0,.52441-.23463,.52441-.52405,0-.28899-.23505-.52405-.52441-.52405h0Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M578.0567,164.91595c.12115,0,.21893-.09779,.21893-.21895v-1.86638c0-.30106-.24469-.54578-.54578-.54578h-1.56085c-.30066,0-.54541,.24472-.54541,.54578v1.86638c0,.12115,.09821,.21895,.21857,.21895,.12079,0,.21893-.09779,.21893-.21895v-1.6265h.18396v4.38239c0,.161,.1308,.29182,.29224,.29182,.16101,0,.29224-.13081,.29224-.29182v-2.53694h.23706v2.53694c0,.161,.1308,.29182,.29181,.29182s.29181-.13081,.29181-.29182v-4.38239h.18756v1.6265c0,.12115,.09821,.21895,.21893,.21895h0Z"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <Path
              d="M582.2016,292.49768c-2.36987,0-4.29004,1.91998-4.29004,4.27997,0,2.37,1.92017,4.28998,4.29004,4.28998,2.37012,0,4.29004-1.91998,4.29004-4.28998,0-2.35999-1.91992-4.27997-4.29004-4.27997Z"
              style={{ fill: "#0f3ee8" }}
            />
            <G>
              <Path
                d="M583.64508,296.76208l-.42328-1.49689-.00519-.00891c-.07422-.25079-.30719-.42438-.56647-.42438h-.89996c-.26263,0-.4964,.17657-.56793,.4296l-.42401,1.50058c-.0304,.10684,.03229,.21924,.13873,.2493,.10754,.03116,.21924-.03189,.24927-.13913l.4151-1.46497-.0011,.52975-.55017,1.94354h.55127v1.73801c0,.14838,.12054,.26895,.26862,.26895,.14838,0,.26935-.12057,.26935-.26895v-1.73801h.21851v1.73801c0,.14838,.12091,.26895,.26929,.26895,.14801,0,.26898-.12057,.26898-.26895v-1.73801h.52008l-.52008-1.84079v-.58466l.401,1.41711c.03003,.10721,.14282,.17026,.24896,.13913,.10681-.03006,.16956-.14246,.1391-.2493"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M582.20148,293.67773c-.26636,0-.48303,.21664-.48303,.483,0,.26675,.21667,.483,.48303,.483,.26672,0,.4834-.21625,.4834-.483,0-.26636-.21667-.483-.4834-.483"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <Path
              d="M575.17188,410.73715v-5.94794h8.81476v5.94794h-8.81476Zm5.95984-3.48694c.00616,.01135,.01038,.01691,.01245,.02316,.07812,.23288,.15674,.46561,.23273,.69922,.00671,.02066,.00122,.04959-.00806,.07053-.29865,.67444-.59851,1.34836-.89813,2.02237-.03369,.07574-.06683,.15173-.10022,.22751,.00928,.00415,.01239,.00677,.0155,.00677,.19843,.00043,.39691,.00143,.59528-.00067,.01532-.00015,.03705-.01892,.04456-.03448,.04102-.08499,.07843-.17175,.11731-.25778,.18365-.4061,.36725-.81219,.55109-1.2182,.05646-.12463,.11346-.24899,.17291-.37949,.00812,.01529,.01367,.0238,.01746,.03302,.12549,.30493,.25159,.60959,.375,.91534,.01581,.03918,.03357,.05377,.07703,.0535,.34515-.00201,.69031-.00113,1.03552-.00113h.05695v-.51666h-.06854c-.2146,0-.42926-.00098-.6438,.00092-.03766,.00034-.05121-.01047-.06024-.04761-.05438-.22336-.1106-.44632-.16937-.66858-.04364-.16519-.08197-.33286-.14111-.49261-.06299-.17001-.14789-.33191-.22284-.4975-.02954-.06531-.05811-.13107-.08936-.2016,.16357,0,.31732-.00092,.47107,.00143,.01508,.00024,.03687,.01727,.04364,.03198,.04932,.10684,.0954,.21518,.14282,.32288,.03278,.0744,.06604,.14856,.09985,.22473,.12128-.0527,.23669-.10287,.35059-.15234-.00073-.00876-.00012-.0126-.0014-.01562-.11053-.25711-.22168-.51398-.3313-.77151-.013-.03055-.03467-.02957-.06006-.02957-.565,.00021-1.13,.00046-1.69501-.00061-.03467-.00006-.05438,.01108-.07343,.03995-.15033,.22815-.30304,.45474-.45343,.68286-.021,.03183-.04346,.04678-.0824,.0452-.06964-.00284-.13947-.00079-.20923-.00079h-.24792v.3876h.0647c.16095,0,.3219,.0004,.48291-.00018,.07312-.00027,.15735,.01968,.21613-.01004,.05884-.02975,.09241-.10971,.13647-.16806,.08051-.10651,.16058-.21329,.24384-.32394l.00006,.00003Zm-4.58069-.36331c.04803-.33795,.09412-.66187,.14081-.99008-.01166,.00381-.01727,.00427-.02112,.00711-.15308,.11435-.3064,.22845-.45837,.34433-.01349,.01028-.02313,.03162-.0257,.04913-.04681,.32132-.09241,.64279-.13794,.96429-.01495,.10544-.02893,.211-.04382,.31989,.06232,.00922,.12024,.01804,.17816,.02631,.36237,.0517,.72479,.10254,1.08685,.15601,.03729,.00552,.06506-.00098,.09369-.02289,.07227-.05533,.14575-.10898,.21857-.16367,.07788-.0585,.15546-.11743,.24384-.1842-.33508-.04785-.65637-.09372-.99304-.14182,.37939-.28485,.74542-.55972,1.11401-.83649-.09503-.1261-.18567-.24646-.27759-.36841-.37219,.27972-.73865,.55511-1.11835,.84048Zm.53625,2.04605h.91553v-.80612h.84827v-.75797h.69464v-.22614h-.92609v.75647h-.84778v.80621h-.91766v.80151h-.89392v.87744h.22687v-.65076h.90021v-.80066h-.00006Zm4.55328-2.90982c.00128-.24875-.19971-.45337-.44647-.45441-.24646-.00104-.45123,.203-.45129,.44968-.00006,.24655,.19934,.44885,.44342,.44998,.25,.00116,.453-.19781,.45428-.44525h.00006Z"
              style={{ fill: "#007f02" }}
            />
            <Path
              d="M581.13171,407.24765c-.08325,.11066-.16333,.21744-.24384,.32394-.04413,.05835-.0777,.13834-.13647,.16806-.05872,.02969-.14301,.00977-.21613,.01004-.16095,.00058-.3219,.00018-.48291,.00018h-.0647v-.3876h.24792c.06976,0,.13959-.00208,.20923,.00079,.03894,.00159,.0614-.01334,.0824-.0452,.15039-.22812,.3031-.45471,.45343-.68286,.01898-.02884,.03876-.04001,.07343-.03995,.565,.00107,1.13,.00082,1.69501,.00061,.02539,0,.04706-.00098,.06006,.02957,.10962,.25751,.22076,.51437,.3313,.77151,.00128,.00302,.00067,.00684,.0014,.01562-.11389,.0495-.22931,.09964-.35059,.15234-.03387-.07614-.06714-.15033-.09985-.22473-.04742-.10773-.09351-.21603-.14282-.32288-.00677-.01471-.02856-.03174-.04364-.03198-.15375-.00235-.3075-.00143-.47107-.00143,.03125,.07053,.05981,.13629,.08936,.2016,.07495,.16559,.15985,.32748,.22284,.4975,.05914,.15973,.09747,.32742,.14111,.49261,.05872,.22226,.11493,.44522,.16937,.66858,.00903,.03714,.02264,.04794,.06024,.04761,.2146-.00189,.4292-.00092,.6438-.00092h.06854v.51666h-.05695c-.34515,0-.69037-.00089-1.03552,.00113-.04346,.00024-.06122-.01434-.07703-.0535-.12341-.30576-.24957-.61041-.375-.91534-.00378-.00922-.00934-.01776-.01746-.03302-.05951,.13049-.11652,.25485-.17291,.37949-.18384,.40601-.36743,.8121-.55109,1.2182-.03888,.08603-.07629,.17279-.11731,.25778-.00751,.01553-.02917,.0343-.04456,.03448-.19843,.00208-.39685,.0011-.59528,.00067-.00311,0-.00623-.00262-.0155-.00677,.03339-.07578,.06653-.15176,.10022-.22751,.29956-.67404,.59943-1.34793,.89813-2.02237,.00928-.02094,.01477-.04987,.00806-.07053-.07593-.23361-.1546-.46631-.23273-.69922-.00208-.00623-.00629-.01178-.01245-.02316l-.00006-.00003Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M576.55103,406.88431c.3797-.28534,.74615-.56076,1.11835-.84048,.09192,.12198,.18262,.24234,.27759,.36841-.36859,.27676-.73468,.55164-1.11401,.83649,.33667,.04807,.65796,.09396,.99304,.14182-.08838,.0668-.16595,.1257-.24384,.1842-.07275,.05466-.1463,.10831-.21857,.16367-.02863,.02191-.05634,.02838-.09369,.02289-.36206-.05347-.72455-.10431-1.08685-.15601-.05798-.00827-.11584-.01709-.17816-.02631,.01489-.10889,.02893-.21448,.04382-.31989,.04553-.3215,.09113-.64297,.13794-.96429,.00256-.01749,.01227-.03885,.0257-.04913,.15192-.11588,.30524-.22998,.45837-.34433,.00385-.00284,.00946-.0033,.02112-.00711-.04669,.32822-.09271,.6521-.14081,.99008Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M577.08728,408.93036v.80066h-.90021v.65076h-.22687v-.87744h.89392v-.80151h.91766v-.80621h.84778v-.75647h.92609v.22614h-.69464v.75797h-.84827v.80612h-.91547Z"
              style={{ fill: "#fff" }}
            />
            <Path
              d="M581.64056,406.02054c-.00128,.24744-.20428,.44641-.45428,.44525-.24414-.00113-.44348-.20343-.44342-.44998,.00006-.24667,.20483-.45074,.45129-.44968,.2467,.00104,.44775,.20566,.44647,.45441h-.00006Z"
              style={{ fill: "#fff" }}
            />
          </G>
          <G>
            <Path
              d="M592.20959,65.20035c.93097,0,1.68896,.75699,1.68896,1.689,0,.931-.758,1.689-1.68896,1.689-.93103,0-1.68903-.758-1.68903-1.689,0-.93201,.758-1.689,1.68903-1.689m0-2.59702c-2.367,0-4.28601,1.91901-4.28601,4.28601s1.91901,4.28601,4.28601,4.28601,4.28595-1.91901,4.28595-4.28601-1.91901-4.28601-4.28595-4.28601"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(586.26191 72.64667)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".81359px",
              }}
            >
              <TSpan x={0} y={0}>
                {"North East Stairwell/Exit Stairs"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M244.02135,166.53592c.931,0,1.689,.75699,1.689,1.689,0,.931-.758,1.689-1.689,1.689s-1.68903-.758-1.68903-1.689c0-.93201,.758-1.689,1.68903-1.689m0-2.59702c-2.367,0-4.28601,1.91901-4.28601,4.28601s1.91901,4.28601,4.28601,4.28601,4.28598-1.91901,4.28598-4.28601-1.91901-4.28601-4.28598-4.28601"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(238.32895 164.93105) rotate(90)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".81737px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Enterance Hall B"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M246.92433,275.4845c.931,0,1.689,.75699,1.689,1.689,0,.931-.758,1.689-1.689,1.689s-1.68903-.758-1.68903-1.689c0-.93201,.758-1.689,1.68903-1.689m0-2.59702c-2.367,0-4.28601,1.91901-4.28601,4.28601s1.91901,4.28601,4.28601,4.28601,4.28598-1.91901,4.28598-4.28601-1.91901-4.28601-4.28598-4.28601"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(241.18018 273.85464) rotate(90)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".81737px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Enterance Hall A"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M240.60635,190.33569c0-.52019,.42294-.9437,.9437-.9437,.52019,0,.9437,.42352,.9437,.9437s-.42352,.94371-.9437,.94371c-.52074,0-.9437-.42352-.9437-.94371m-1.45103,0c0,1.32253,1.0722,2.39473,2.39473,2.39473s2.39473-1.0722,2.39473-2.39473-1.0722-2.39471-2.39473-2.39471-2.39473,1.0722-2.39473,2.39471"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(239.42693 193.51562)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".51759px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Electrical Rooms"}
              </TSpan>
            </Text>
          </G>
          <G>
            <Path
              d="M148.6696,99.54605c-2.36987,0-4.29004,1.91998-4.29004,4.27997,0,2.37,1.92017,4.28998,4.29004,4.28998,2.37012,0,4.29004-1.91998,4.29004-4.28998,0-2.35999-1.91992-4.27997-4.29004-4.27997Z"
              style={{ fill: "#0f3ee8" }}
            />
            <G>
              <Path
                d="M150.11307,103.81047l-.42329-1.49688-.00517-.00891c-.0742-.25078-.30717-.42438-.56648-.42438h-.89998c-.26265,0-.49638,.17658-.56796,.42959l-.42403,1.50058c-.03043,.10685,.03229,.21925,.13875,.2493,.10757,.03116,.21925-.0319,.24928-.13912l.41512-1.46498-.00111,.52975-.55016,1.94354h.55127v1.73802c0,.14838,.12054,.26896,.26859,.26896,.14838,0,.26932-.12057,.26932-.26896v-1.73802h.21852v1.73802c0,.14838,.12093,.26896,.2693,.26896,.14804,0,.26897-.12057,.26897-.26896v-1.73802h.52011l-.52011-1.84078v-.58465l.40103,1.41712c.03004,.10721,.14284,.17027,.24895,.13912,.10683-.03005,.16953-.14245,.13911-.2493"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M148.66943,100.72611c-.26637,0-.48302,.21665-.48302,.48301,0,.26674,.21664,.48301,.48302,.48301,.26672,0,.48337-.21626,.48337-.48301,0-.26636-.21664-.48301-.48337-.48301"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <Path
              d="M211.20969,41.21541c-2.36987,0-4.29004,1.91998-4.29004,4.27997,0,2.37,1.92017,4.28998,4.29004,4.28998,2.37012,0,4.29004-1.91998,4.29004-4.28998,0-2.35999-1.91992-4.27997-4.29004-4.27997Z"
              style={{ fill: "#0f3ee8" }}
            />
            <G>
              <Path
                d="M211.20946,42.13015c-.289,0-.52406,.23506-.52406,.52405,0,.28941,.23506,.52405,.52406,.52405,.28938,0,.52444-.23464,.52444-.52405,0-.28899-.23506-.52405-.52444-.52405h0Z"
                style={{ fill: "#fff" }}
              />
              <Path
                d="M212.31647,46.03886c.12115,0,.21893-.09779,.21893-.21895v-1.86638c0-.30106-.24471-.54578-.54578-.54578h-1.56087c-.30067,0-.54541,.24472-.54541,.54578v1.86638c0,.12116,.09822,.21895,.21857,.21895,.12076,0,.21896-.09779,.21896-.21895v-1.62649h.18393v4.38238c0,.161,.13081,.29182,.29224,.29182,.161,0,.29224-.13082,.29224-.29182v-2.53694h.23706v2.53694c0,.161,.13081,.29182,.29179,.29182,.161,0,.29182-.13082,.29182-.29182v-4.38238h.18756v1.62649c0,.12116,.09821,.21895,.21896,.21895h-.00002Z"
                style={{ fill: "#fff" }}
              />
            </G>
          </G>
          <G>
            <Path
              d="M539.28436,40.10847c0-.40069,.32581-.72692,.72693-.72692,.4007,0,.72693,.32623,.72693,.72692s-.32623,.72693-.72693,.72693c-.40112,0-.72693-.32623-.72693-.72693m-1.11774,0c0,1.01873,.82593,1.84464,1.84467,1.84464s1.84467-.82592,1.84467-1.84464-.82593-1.84463-1.84467-1.84463-1.84467,.82592-1.84467,1.84463"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(536.9209 43.01562)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".80432px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Electrical Room"}
              </TSpan>
            </Text>
          </G>
          <Text
            transform="translate(147.18994 29.37293)"
            style={{
              fill: "#1b4459",
              fontFamily: "Poppins-Regular, Poppins",
              fontSize: ".88564px",
            }}
          >
            <TSpan x={0} y={0}>
              {"NW Emergency Exit Stairs"}
            </TSpan>
          </Text>
          <Text
            transform="translate(124.87061 137.8517)"
            style={{
              fill: "#1b4459",
              fontFamily: "Poppins-Regular, Poppins",
              fontSize: "1.98852px",
            }}
          >
            <TSpan x={0} y={0}>
              {"Theater Emergency Exit"}
            </TSpan>
          </Text>
          <Text
            transform="translate(113.4211 162.01645)"
            style={{
              fill: "#1b4459",
              fontFamily: "Poppins-Regular, Poppins",
              fontSize: "1.98852px",
            }}
          >
            <TSpan x={0} y={0}>
              {"Orchestra"}
            </TSpan>
            <TSpan x={-1.53906} y={2.38623}>
              {"Pit Enterance"}
            </TSpan>
          </Text>
          <G>
            <Path
              d="M553.72913,40.10847c0-.40069,.32581-.72692,.72693-.72692,.4007,0,.72693,.32623,.72693,.72692s-.32623,.72693-.72693,.72693c-.40112,0-.72693-.32623-.72693-.72693m-1.11774,0c0,1.01873,.82593,1.84464,1.84467,1.84464s1.84467-.82592,1.84467-1.84464-.82593-1.84463-1.84467-1.84463-1.84467,.82592-1.84467,1.84463"
              style={{ fill: "#f58422" }}
            />
            <Text
              transform="translate(551.36566 43.01562)"
              style={{
                fill: "#1b4459",
                fontFamily: "Poppins-Regular, Poppins",
                fontSize: ".80432px",
              }}
            >
              <TSpan x={0} y={0}>
                {"Electrical Room"}
              </TSpan>
            </Text>
          </G>
        </G>
        <Text
          transform="translate(143.96727 61.83772)"
          style={{
            fill: "#fff",
            fontFamily: "Poppins-Regular, Poppins",
            fontSize: ".78269px",
          }}
        >
          <TSpan x={0} y={0}>
            {"SW Hall Lobby Elevator"}
          </TSpan>
        </Text>

        {coordinate !== null && (
          <>
            {/* <Path
              d="m13.5,1.2051C12.10999.3951,10.54999-.00492,9-.00492s-3.10999.40002-4.5,1.21002c-1.39001.79999-2.51001,1.95001-3.28998,3.28998-.78003,1.35004-1.21002,2.90002-1.21002,4.5,0,1.69.26001,3.35999.76001,4.95001.51001,1.59998,1.25,3.10999,2.22998,4.5l6.01001,8.56,6.01001-8.56c1.95001-2.77002,2.98999-6.07001,2.98999-9.45001,0-3.20996-1.71997-6.19-4.5-7.78998Zm-.12,16.08997l-4.38,6.23004-4.38-6.23004c-1.71002-2.44-2.62-5.31-2.62-8.29999,0-2.48999,1.34003-4.82001,3.5-6.06,1.06-.60999,2.27002-.94,3.5-.94s2.44.33002,3.5.94c2.15997,1.23999,3.5,3.57001,3.5,6.06,0,2.98999-.90997,5.85999-2.62,8.29999Z"
              x={coordinate?.x}
              y={coordinate?.y}
              style={{
                position: "absolute",
                width: 5,
                height: 5,
                fill: "red",
              }}
            />
            <Path
              d="m9,5.20076c-1.7357,0-3.14257,1.43267-3.14257,3.20022s1.40687,3.2007,3.14257,3.2007,3.14257-1.43316,3.14257-3.2007-1.40687-3.20022-3.14257-3.20022Z"
              x={coordinate?.x}
              y={coordinate?.y}
              style={{
                position: "absolute",
                width: 5,
                height: 5,
                fill: "red",
              }}
            /> */}
            <Path 
               d="m7,0C3.56802,0,0,2.56489,0,6.68685c0,4.12159,7,13.31315,7,13.31315,0,0,7-9.19156,7-13.31315C14,2.56489,10.43153,0,7,0ZM1.49365,6.68685C1.49365,3.54475,4.35199,1.59992,7.00023,1.59992s5.50658,1.94483,5.50658,5.08693c0,2.22462-3.02148,7.21682-5.50612,10.72318C4.51559,13.9022,1.49365,8.90854,1.49365,6.68685Z"
               x={coordinate?.x}
               y={coordinate?.y}
               style={{
                 position: "absolute",
                 width: 5,
                 height: 5,
                 fill: "red",
               }}
             />
             <Path 
              d="m7,4.24685c-1.45208,0-2.62906,1.17689-2.62906,2.62886s1.17698,2.62926,2.62906,2.62926,2.62906-1.17729,2.62906-2.62926-1.17698-2.62886-2.62906-2.62886Z" 
              x={coordinate?.x}
              y={coordinate?.y}
              style={{
                position: "absolute",
                width: 5,
                height: 5,
                fill: "red",
              }}
              />
          </>
        )}
        {showElevatorCircle && (
          <Circle
            xmlns="http://www.w3.org/2000/svg"
            cx="172"
            cy="415"
            r="8"
            stroke="black"
            stroke-width="1"
            fill="green"
            onPress={handleCirclePress}
          />
        )}
        {showStairsCircle && (
          <Circle
            xmlns="http://www.w3.org/2000/svg"
            cx="185"
            cy="332"
            r="8"
            stroke="black"
            stroke-width="1"
            fill="green"
            onPress={handleCirclePress}
          />
        )}
      </Svg>
    )
  );
}
