import { Lightmap } from "./lightmap.js";
import * as THREE from "three";
import type { World } from "../world/world.js";
/**
 * Builds one mesh per block texture for the whole world.
 *
 * The lightmap is passed in so terrain materials can be patched to sample it;
 * because the light is a vertex attribute rather than a baked colour, changing
 * the time of day or turning on night vision never brings us back here.
 */
export function buildWorldMesh(world: World, lightmap: Lightmap, clearGlass?: boolean): THREE.Group;
